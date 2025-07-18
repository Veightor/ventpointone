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

    // Make the request to Anvil API
    const response = await fetch(`${apiUrl}/results/list_ids/${amount}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Anvil API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        {
          error: `Failed to fetch blog list: ${response.status} ${response.statusText}`,
          amount: amount,
        },
        { status: response.status }
      );
    }

    // Check content type and handle accordingly
    const contentType = response.headers.get("content-type") || "";
    let data;

    console.log(`📦 Response content-type: ${contentType}`);

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // Handle non-JSON response
      const textResponse = await response.text();
      console.log(
        `📝 Raw response preview: ${textResponse.substring(0, 200)}...`
      );

      try {
        data = JSON.parse(textResponse);
        console.log("✅ Successfully parsed text response as JSON");
      } catch (parseError) {
        console.log("⚠️ Response is not JSON, treating as raw text");
        data = { rawContent: textResponse };
      }
    }

    // Log success for debugging
    console.log(`✅ Successfully fetched last ${amount} blog posts`);

    return NextResponse.json({
      success: true,
      amount: amount,
      data,
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
