import { NextResponse } from "next/server";
import { parseVcf, getVariantSummary } from "@/lib/vcf";

const MAX_VCF_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("text/plain") && !contentType.includes("application/octet-stream")) {
    return NextResponse.json({ error: "Expected plain text VCF payload." }, { status: 415 });
  }

  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : NaN;
  if (!Number.isNaN(contentLength) && contentLength > MAX_VCF_SIZE_BYTES) {
    return NextResponse.json({ error: "VCF payload too large. Maximum supported size is 10 MB." }, { status: 413 });
  }

  const body = await request.text();
  if (body.length > MAX_VCF_SIZE_BYTES) {
    return NextResponse.json({ error: "VCF payload too large. Maximum supported size is 10 MB." }, { status: 413 });
  }

  const result = parseVcf(body);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    summary: getVariantSummary(result.variants)
  });
}
