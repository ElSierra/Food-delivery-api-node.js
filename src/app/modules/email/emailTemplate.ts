export const template = (link: string, name: string) => {
  const template = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <link rel="icon" type="image/x-icon"
          href="https://lh3.googleusercontent.com/pw/AJFCJaXfPqZIQSgNapmaTHhaaC_BuI7xFg8C1XEvQvAxzd55nDjGGzZpu1h-SAnyXU6b9oXluADXYmH9z9cnfowBdoYbIR-2q1NI7OXtgvBVvNwjIHGwU6XRYv-2QKqKSq2va4pyjjwGskZVBIE-Imrz9d1Xn_WBkpXytFIpCgFZcDg08EWUGo5SdnofrcwowgUankDFIlN_rIerRuJfXIpemMkGOPz53GNZ4t_Cwz5FHiF6_qou_6IHKNCAJmXB1SR70lsrbkWlEd62ZzbTbPCpX2fJPsy38Kc9-9yY-DCF_oe-4u_-OfBu2ADkHIAIC4IrMy3-r83O4l9H6yZrgbujfvzUCjUCoVJQFFHd1pKipT88fg2tcdU_k-OKc_UvZoMoI2zbdUg2NxFIg4YbfJnFwdU_B8VrgT_Lw4dJ1zCKxTIyrz0KO4RF6CyoYNpcW0OodImEVtNPtwlE2c2wZMtLi5-YhPztnuYWA_j7E8Fw0FYEvM8y66FvZggTWe-K5dlVHCATHSd3rSkm_U5skT1mwR9jVkILArLb6UkCT0l3xDyVDL59e8E_mQH4ZDxrBGyCW3ZySVq3Zv6jm1UNYSIDJ-WQWksD1l4GhTnH6KJa5ooF5ZhXjE85hvJfP0y1qQj-BsNPvLDmrECQFp1_MrILzHaDuVT0pig6U6-W2_vHxGzTsKATVhU8fbSowj2EtbbnzqOqpBx6fj7ucIlHpAbRvdSY0H4f1gtCG4F3UO0_OGopWYWM_f72nhay62fRY2J-cLLLI_FEPvQD-vcp1i_KpC2puxB92Wo9pmtmhIA7g_yVsMHLS2t01hssvCgDqcq7KcqvzJg-JgcbT7kwrZ2qjwp9OxBYQGSOPPUROGiF0J6DreOgFpQHQNigt0ASfJq_n4CHR0nRyGH5YwRO6Hu-J67rMjw=s200-no?authuser=0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,600;0,700;0,800;1,200;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
      <style>
          /* Main body styling */
          body {
              margin: 0;
              padding: 0;
  
              font-family: Arial, sans-serif;
              background-color: #ffffff;
              color: #000000;
              font-size: 16px;
              line-height: 1.4;
  
          }
  
          /* Container div for email content */
          .email-container {
  
  
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 30px;
              background-image: linear-gradient(to left, rgba(26, 246, 220, 0.152),rgb(251, 233, 247));
              background-size: cover !important;
              background-attachment: fixed !important;
              background-repeat: no-repeat !important;
          }
  
          /* Header section */
          .header {
              border: 0.5px solid rgb(190, 190, 190);
              background-color: #ffffff6f;
              color: #000000;
              text-align: center;
              backdrop-filter: blur(10px);
              margin-bottom: 30px;
              text-align: center;
              border-radius: 10px;
          }
  
          .header img {
              display: inline-block;
              width: 24px;
              height: 24px;
              vertical-align: middle;
              margin-right: 10px;
          }
  
          /* Body section */
          .body {
              margin-top: 20px;
              padding: 20px;
  
              border: 1px solid #e0e0e0;
              border-radius: 5px;
  
          }
  
          /* Code section */
          .code {
              font-size: 32px;
              font-weight: bold;
              color: #0a0a0a;
              text-align: center;
              margin-bottom: 10px;
          }
  
          .header h1 {
              display: inline-block;
              color: #333333;
              font-size: 24px;
              margin: 0;
              vertical-align: middle;
          }
  
          /* Call to action button */
          .cta-btn {
              display: block;
              margin: 20px auto 0;
              padding: 10px 20px;
              background-color: #0c3305;
              color: #fff;
              text-align: center;
              text-decoration: none;
              border-radius: 5px;
          }
  
          /* Responsive styles */
          @media only screen and (max-width: 600px) {
              .email-container {
                  max-width: 100%;
              }
          }
  
          .body-bg {
              width: 30%;
  
          }
      </style>
  </head>
  
  <body>
      <div class="email-container">
          <div class="header">
              <img width="50%" height="50%"
                  src="https://quickchop.ojoisaac.me/qc.png"
                  alt="Header Image">
              <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;">OTP</h1>
          </div>
          <div class="body">
  
              <div style="display: flex;">
                  <div style="width: 70%;">
                      <p style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;">Dear ${name},</p>
                      <p style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 200;">Verify your Email Please</p>
                      <a href=${link} class="cta-btn"><p>Verify Now</p></a>
                      <a href=${link}><p>${link}</p></a>
                  </div>
                  <div class="body-bg">
                      <img width="100%"
                          src="https://quickchop.ojoisaac.me/hi.png" />
                  </div>
              </div>
              <p
                  style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: small; font-weight: 300;text-align: right;">
                  Expires in 10 Minutes</p>
          </div>
      </div>
  </body>
  
  </html>`;

  return template;
};
