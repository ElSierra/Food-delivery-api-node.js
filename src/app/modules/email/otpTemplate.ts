export const otpTemplate = (otp: string, name:string, email: string) => {
  const template = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/x-icon" href="/qc-black.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
      /* Main body styling */
      body {
        margin: 0;
        padding: 0; 
        font-family: Arial, sans-serif;
        background-color: #f6f6f6;
        color: #4d4d4d;
        font-size: 16px;
        line-height: 1.4;
      }
  
      /* Container div for email content */
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
  
      /* Header section */
      .header {
        background-color: #2196f3;
        color: #fff;
        padding: 10px;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
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
        color: #2196f3;
        text-align: center;
        margin-bottom: 10px;
      }
  
      /* Call to action button */
      .cta-btn {
        display: block;
        margin: 20px auto 0;
        padding: 10px 20px;
        background-color: #2196f3;
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
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>🔐 Verification Code</h1>
      </div>
      <div class="body">
        <p>Dear ${name},</p>
        <p>Please use the following verification code to verify your account:</p>
        <p>${email}</p>
        <div class="code">${otp}</div>

        
      </div>
    </div>
  </body>
  </html>
  
     `;

  return template;
};
