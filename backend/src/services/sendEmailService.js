import nodemailer from "nodemailer";

// Cấu hình dịch vụ email (Sử dụng Gmail hoặc dịch vụ khác)
const transporter = nodemailer.createTransport({
  service: "gmail", // Hoặc sử dụng host và port cho dịch vụ khác
  auth: {
    user: "nguyentuankietmd04092003@gmail.com", // Địa chỉ email của bạn
    pass: "thbn moqa jpxq yukt", // Mật khẩu ứng dụng (hoặc mật khẩu email)
  },
});

// Hàm gửi email
export const sendEmailService = async (email, code) => {
  // Tạo nội dung email
  const mailOptions = {
    from: '"Your Company" <your-email@gmail.com>', // Tên người gửi và địa chỉ email
    to: email, // Địa chỉ email nhận
    subject: "Password Reset Code", // Chủ đề email
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p style="font-size: 16px;">Your verification code is:</p>
        <h1 style="background-color: #f2f2f2; padding: 10px; border: 1px solid #ddd; text-align: center; color: #333;">${code}</h1>
        <p style="font-size: 14px; color: #999;">This code expires in 15 minutes.</p>
        <br>
        <p>Best regards,<br>Your Company</p>
      </div>
    `,
  };

  try {
    // Gửi email
    let info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};
