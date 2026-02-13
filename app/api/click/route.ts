import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST() {
  try {
    const db = getDb();
    const result = await db.query(
      "INSERT INTO click_log DEFAULT VALUES RETURNING id, created_at"
    );
    const row = result.rows[0];
    
    // Get total count
    const countResult = await db.query("SELECT COUNT(*) as total FROM click_log");
    const total = countResult.rows[0].total;

    return NextResponse.json({
      success: true,
      id: row.id,
      created_at: row.created_at,
      total: parseInt(total),
    });
  } catch (error: any) {
    console.error("DB error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = getDb();
    const countResult = await db.query("SELECT COUNT(*) as total FROM click_log");
    const recentResult = await db.query(
      "SELECT id, created_at FROM click_log ORDER BY created_at DESC LIMIT 10"
    );
    
    return NextResponse.json({
      total: parseInt(countResult.rows[0].total),
      recent: recentResult.rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
