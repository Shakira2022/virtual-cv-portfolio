import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { to, body } = await req.json()

    if (!to || !body) {
      return NextResponse.json({ error: "Missing 'to' or 'body' in request" }, { status: 400 })
    }

    const username = process.env.BULKSMS_USERNAME
    const password = process.env.BULKSMS_PASSWORD

    if (!username || !password) {
      console.error("BULKSMS_USERNAME or BULKSMS_PASSWORD not set in environment variables.")
      return NextResponse.json({ error: "Server configuration error: SMS credentials missing." }, { status: 500 })
    }

    const params = new URLSearchParams({
      username: username,
      password: password,
      message: body,
      msisdn: to,
    })

    const response = await fetch(`https://bulksms.com/eapi/submission/send_sms/2/2.0?${params.toString()}`, {
      method: "GET", // BulkSMS API uses GET for sending SMS
    })

    // BulkSMS API typically returns a plain text response like "0|SUCCESS" or "23|AUTH_FAILED"
    const responseText = await response.text()

    if (response.ok && responseText.startsWith("0|")) {
      return NextResponse.json({ success: true, message: "SMS sent successfully", apiResponse: responseText })
    } else {
      console.error("BulkSMS API Error:", responseText)
      return NextResponse.json({ error: `Failed to send SMS: ${responseText}` }, { status: response.status })
    }
  } catch (error) {
    console.error("Error in send-sms API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
