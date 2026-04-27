import { POST } from "@/app/api/variants/summary/route";

const validVcf = `##fileformat=VCFv4.2
#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO
chr1\t100\trs1\tA\tG\t50\tPASS\tDP=10
chr1\t101\t.\tA\tAT\t.\tPASS\tDP=12`;

describe("POST /api/variants/summary", () => {
  it("rejects oversized payload from content-length header", async () => {
    const request = new Request("http://localhost/api/variants/summary", {
      method: "POST",
      headers: {
        "content-type": "text/plain",
        "content-length": String(11 * 1024 * 1024)
      },
      body: "small"
    });

    const response = await POST(request);
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "VCF payload too large. Maximum supported size is 10 MB." });
  });

  it("rejects unsupported content type", async () => {
    const request = new Request("http://localhost/api/variants/summary", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ vcf: validVcf })
    });

    const response = await POST(request);
    expect(response.status).toBe(415);
    expect(await response.json()).toEqual({ error: "Expected plain text VCF payload." });
  });

  it("rejects invalid vcf payload", async () => {
    const request = new Request("http://localhost/api/variants/summary", {
      method: "POST",
      headers: {
        "content-type": "text/plain"
      },
      body: "not-a-vcf"
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.error).toContain("#CHROM");
  });

  it("returns parsed variant summary for valid payload", async () => {
    const request = new Request("http://localhost/api/variants/summary", {
      method: "POST",
      headers: {
        "content-type": "text/plain"
      },
      body: validVcf
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.summary).toEqual({
      totalVariants: 2,
      snpCount: 1,
      insertionCount: 1,
      deletionCount: 0,
      complexCount: 0,
      uniqueChromosomes: 1
    });
  });

  it("rejects oversized payload by body length", async () => {
    const hugeBody = "#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO\n" + "A".repeat(10 * 1024 * 1024 + 1);
    const request = new Request("http://localhost/api/variants/summary", {
      method: "POST",
      headers: {
        "content-type": "text/plain"
      },
      body: hugeBody
    });

    const response = await POST(request);
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "VCF payload too large. Maximum supported size is 10 MB." });
  });
});
