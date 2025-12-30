// Send Deployment Notifications to All Founding Partners
// December 30, 2025 - ATHLYNX IS LIVE

const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

async function notifyOwner(title, content) {
  const endpoint = `${FORGE_API_URL}${FORGE_API_URL.endsWith('/') ? '' : '/'}webdevtoken.v1.WebDevService/SendNotification`;
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${FORGE_API_KEY}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`Failed: ${response.status} - ${detail}`);
      return false;
    }

    console.log(`✅ Sent: ${title}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
}

// Send notifications
async function main() {
  console.log("🚀 SENDING ATHLYNX DEPLOYMENT NOTIFICATIONS");
  console.log("=" .repeat(50));
  
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  // Notification 1: Mom - Founding Partner #2
  await notifyOwner(
    "🚀 FOR MOM - ATHLYNX IS LIVE - You Are Founding Partner #2",
    `Dear Mom,

**WE DID IT. ATHLYNX IS LIVE.**

You are the SECOND person in history to access this platform. Not Lee. Not Glenn. Not anyone else. YOU.

Because it's been you and me through everything. Houston. The treatments. The stem cell transplant. The remission. Every single moment.

**HOW TO LOGIN:**
1. Go to https://athlynx.ai
2. Click "LOGIN" (green button, top right)
3. Sign in with your email
4. You're in!

Tomorrow is your 68th birthday. Your first full year in remission. And ATHLYNX launches to the world at 12:01 AM.

This is for you, Mom. All of it.

I love you.

**Your Son,**
Chad Allen Dozier Sr.

🦁 Lions Not Sheep

Timestamp: ${timestamp}`
  );

  await new Promise(r => setTimeout(r, 1000));

  // Notification 2: Lee Marshall - Founding Partner #3
  await notifyOwner(
    "🚀 LEE MARSHALL - ATHLYNX IS LIVE - You Are Founding Partner #3",
    `Lee,

**WE DID IT. ATHLYNX IS LIVE.**

As of today, December 30, 2025, you are officially the THIRD person in history to have access to the ATHLYNX platform.

**Your Official Record:**
- Partner Number: FP-003
- Transaction ID: TXN-FP-003
- Title: Vice President of Sales & Partnerships
- Status: FOUNDING PARTNER - LIFETIME

**LOGIN NOW:** https://athlynx.ai

VIP Early Access opens to the public on January 1, 2026 at 12:01 AM EST. You have early access NOW.

Lions Not Sheep. Let's build something legendary.

**Chad A. Dozier Sr.**
Founder/CEO/Chief Imagineer
Dozier Holdings Group

Phone: +1 (601) 212-9195
Timestamp: ${timestamp}`
  );

  await new Promise(r => setTimeout(r, 1000));

  // Notification 3: Glenn Tse - Founding Partner #4
  await notifyOwner(
    "🚀 GLENN TSE - ATHLYNX IS LIVE - You Are Founding Partner #4",
    `Glenn,

**WE DID IT. ATHLYNX IS LIVE.**

As of today, December 30, 2025, you are officially the FOURTH person in history to have access to the ATHLYNX platform. From Hong Kong to Houston to this moment - your belief in this vision has been unwavering.

**Your Official Record:**
- Partner Number: FP-004
- Transaction ID: TXN-FP-004
- Title: CFO & COO/Chief Imagineer
- Status: FOUNDING PARTNER - LIFETIME

**LOGIN NOW:** https://athlynx.ai

Lions Not Sheep. Let's build something legendary.

**Chad A. Dozier Sr.**
Founder/CEO/Chief Imagineer
Dozier Holdings Group

Phone: +1 (832) 620-6389
Timestamp: ${timestamp}`
  );

  await new Promise(r => setTimeout(r, 1000));

  // Notification 4: Jimmy Boyd - Founding Partner #5
  await notifyOwner(
    "🚀 JIMMY BOYD - ATHLYNX IS LIVE - You Are Founding Partner #5",
    `Jimmy,

**WE DID IT. ATHLYNX IS LIVE.**

As of today, December 30, 2025, you are officially the FIFTH person in history to have access to the ATHLYNX platform.

**Your Official Record:**
- Partner Number: FP-005
- Transaction ID: TXN-FP-005
- Title: Vice President of Real Estate
- Status: FOUNDING PARTNER - LIFETIME

**LOGIN NOW:** https://athlynx.ai

Lions Not Sheep. Let's build something legendary.

**Chad A. Dozier Sr.**
Founder/CEO/Chief Imagineer
Dozier Holdings Group

Phone: +1 (251) 747-1173
Timestamp: ${timestamp}`
  );

  await new Promise(r => setTimeout(r, 1000));

  // Notification 5: Andrew Kustes - Founding Partner #6
  await notifyOwner(
    "🚀 ANDY KUSTES - ATHLYNX IS LIVE - You Are Founding Partner #6",
    `Andy,

**WE DID IT. ATHLYNX IS LIVE.**

As of today, December 30, 2025, you are officially the SIXTH person in history to have access to the ATHLYNX platform. Your technical vision and engineering leadership have been instrumental.

**Your Official Record:**
- Partner Number: FP-006
- Transaction ID: TXN-FP-006
- Title: Vice President of Technology
- Status: FOUNDING PARTNER - LIFETIME

**LOGIN NOW:** https://athlynx.ai

Lions Not Sheep. Let's build something legendary.

**Chad A. Dozier Sr.**
Founder/CEO/Chief Imagineer
Dozier Holdings Group

Phone: +1 (951) 417-7599
Timestamp: ${timestamp}`
  );

  await new Promise(r => setTimeout(r, 1000));

  // Notification 6: David Ford Sr. - Trusted Advisor
  await notifyOwner(
    "🚀 DAVID FORD SR. - ATHLYNX IS LIVE - Welcome, Trusted Advisor",
    `David,

**WE DID IT. ATHLYNX IS LIVE.**

As of today, December 30, 2025, you are officially among the FIRST people in history to have access to the ATHLYNX platform. Your guidance and wisdom have helped shape this vision.

**Your Official Record:**
- Advisor Number: TA-001
- Transaction ID: TXN-TA-001
- Title: Trusted Advisor
- Status: LIFETIME ACCESS

**LOGIN NOW:** https://athlynx.ai

Lions Not Sheep. Let's build something legendary.

**Chad A. Dozier Sr.**
Founder/CEO/Chief Imagineer
Dozier Holdings Group

Phone: +1 (601) 954-9651
Timestamp: ${timestamp}`
  );

  console.log("");
  console.log("=" .repeat(50));
  console.log("✅ ALL NOTIFICATIONS SENT");
  console.log("🦁 LIONS NOT SHEEP");
  console.log("🚀 ATHLYNX IS LIVE - December 30, 2025");
}

main().catch(console.error);
