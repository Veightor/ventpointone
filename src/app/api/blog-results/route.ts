import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the ID from query parameters
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Validate the ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing prompt ID" },
        { status: 400 }
      );
    }

    console.log(`🔍 Processing blog result request for ID: ${id}`);

    // Create basic auth header using environment variables
    const username = process.env.ANVIL_USERNAME;
    const password = process.env.ANVIL_PASSWORD;
    const apiUrl = process.env.ANVIL_API_URL;

    if (!username || !password || !apiUrl) {
      console.error("Missing required Anvil API environment variables");
      console.error(
        "Required variables: ANVIL_USERNAME, ANVIL_PASSWORD, ANVIL_API_URL"
      );
      return NextResponse.json(
        {
          error: "Server configuration error - missing environment variables",
          required: ["ANVIL_USERNAME", "ANVIL_PASSWORD", "ANVIL_API_URL"],
        },
        { status: 500 }
      );
    }

    const credentials = btoa(`${username}:${password}`);

    // Make the request to Anvil API from the server side
    const response = await fetch(`${apiUrl}/results/get/${id}`, {
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
          error: `Failed to fetch blog results: ${response.status} ${response.statusText}`,
          promptId: id,
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
      // Handle non-JSON response (possibly binary or text)
      const textResponse = await response.text();
      console.log(
        `📝 Raw response preview: ${textResponse.substring(0, 200)}...`
      );

      try {
        // Try parsing as JSON anyway (some APIs don't set proper content-type)
        data = JSON.parse(textResponse);
        console.log("✅ Successfully parsed text response as JSON");
      } catch (parseError) {
        console.log("⚠️ Response is not JSON, treating as raw text");
        // If it's not parseable JSON, check if it looks like our expected format
        if (
          textResponse.includes('"content"') ||
          textResponse.includes('"title"')
        ) {
          // Might be JSON with wrong content-type, try a more lenient parse
          try {
            // Clean up potential encoding issues
            const cleanedText = textResponse.replace(
              /[\x00-\x1F\x7F-\x9F]/g,
              ""
            );
            data = JSON.parse(cleanedText);
          } catch {
            data = { rawContent: textResponse };
          }
        } else {
          data = { rawContent: textResponse };
        }
      }
    }

    // Log success for debugging
    console.log(`✅ Successfully fetched blog results for ID: ${id}`);

    return NextResponse.json({
      success: true,
      promptId: id,
      data,
    });
  } catch (error) {
    console.error("Error fetching blog results:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
