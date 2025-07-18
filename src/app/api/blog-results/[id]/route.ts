import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Validate the ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing prompt ID" },
        { status: 400 }
      );
    }

    // Decode the URL-encoded ID
    const decodedId = decodeURIComponent(id);

    // Create basic auth header using environment variables
    const username = process.env.ANVIL_USERNAME;
    const password = process.env.ANVIL_PASSWORD;
    const apiUrl = process.env.ANVIL_API_URL;

    if (!username || !password || !apiUrl) {
      console.error("Missing required Anvil API environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const credentials = btoa(`${username}:${password}`);

    // Make the request to Anvil API from the server side
    const response = await fetch(`${apiUrl}/results/get/${decodedId}`, {
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
          promptId: decodedId,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Log success for debugging
    console.log(`✅ Successfully fetched blog results for ID: ${decodedId}`);

    return NextResponse.json({
      success: true,
      promptId: decodedId,
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
