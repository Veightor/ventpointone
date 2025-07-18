import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ last_amt: string }> }
) {
  try {
    const { last_amt } = await context.params;

    // Validate the last_amt parameter
    const amount = parseInt(last_amt);
    if (isNaN(amount) || amount < 1 || amount > 50) {
      return NextResponse.json(
        { error: "Invalid amount. Must be a number between 1 and 50." },
        { status: 400 }
      );
    }

    console.log(`🔍 Fetching last ${amount} blog posts from Anvil API`);

    // Create basic auth header using environment variables
    const username = process.env.ANVIL_USERNAME;
    const password = process.env.ANVIL_PASSWORD;
    const apiUrl = process.env.ANVIL_API_URL;

    if (!username || !password || !apiUrl) {
      console.error("Missing required Anvil API environment variables");
      return NextResponse.json(
        {
          error: "Server configuration error - missing environment variables",
          required: ["ANVIL_USERNAME", "ANVIL_PASSWORD", "ANVIL_API_URL"],
        },
        { status: 500 }
      );
    }

    const credentials = btoa(`${username}:${password}`);

    // First, get the current highest ID by requesting 1 item
    const currentResponse = await fetch(`${apiUrl}/results/list_ids/1`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!currentResponse.ok) {
      console.error(`Failed to get current ID: ${currentResponse.status}`);
      return NextResponse.json(
        { error: `Failed to get current ID: ${currentResponse.status}` },
        { status: currentResponse.status }
      );
    }

    const currentData = await currentResponse.json();
    console.log("📊 Current ID response:", currentData);

    // Extract current ID (should be the first/highest number in the array)
    let currentId: number;
    if (Array.isArray(currentData) && currentData.length > 0) {
      currentId = parseInt(currentData[0]);
    } else {
      console.error(
        "Unable to determine current ID from response:",
        currentData
      );
      return NextResponse.json(
        { error: "Unable to determine current ID" },
        { status: 500 }
      );
    }

    console.log(`📊 Current ID determined: ${currentId}`);

    // Calculate the IDs we want (current ID minus 1 through 5)
    const targetIds = [];
    for (let i = 1; i <= amount; i++) {
      targetIds.push(currentId - i);
    }

    console.log(`📋 Target IDs: ${targetIds.join(", ")}`);

    // Now fetch individual posts for each target ID
    const posts = [];
    for (const id of targetIds) {
      if (id > 0) {
        // Only fetch positive IDs
        try {
          const postResponse = await fetch(`${apiUrl}/results/get/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Basic ${credentials}`,
              "Content-Type": "application/json",
            },
          });

          if (postResponse.ok) {
            const postData = await postResponse.json();
            console.log(
              `✅ Fetched post ${id}:`,
              postData.data?.[0]?.title || "No title"
            );

            // Extract the blog data
            if (
              postData.data &&
              Array.isArray(postData.data) &&
              postData.data.length > 0
            ) {
              const blogData = postData.data[0];
              posts.push({
                id: id.toString(),
                title: blogData.title || `Blog Post ${id}`,
                subtitle: blogData.subtitle || "",
                created_at: new Date().toISOString(), // We don't have real timestamps
                snippet:
                  blogData.subtitle ||
                  blogData.paragraphs?.[0]?.content?.substring(0, 150) ||
                  "",
              });
            }
          } else {
            console.log(
              `⚠️ Failed to fetch post ${id}: ${postResponse.status}`
            );
          }
        } catch (error) {
          console.error(`❌ Error fetching post ${id}:`, error);
        }
      }
    }

    console.log(`📋 Successfully collected ${posts.length} posts`);

    return NextResponse.json({
      success: true,
      amount: amount,
      currentId: currentId,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching blog list:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
