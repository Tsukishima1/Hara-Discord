import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = params.serverId;
    if (!serverId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: { inviteCode: uuidv4() },
    });

    return NextResponse.json(server);

  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}