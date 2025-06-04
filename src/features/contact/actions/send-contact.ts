"use server";

import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "../schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export const sendContactAction = async (
  prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> => {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // バリデーション
    const validatedData = contactSchema.parse(data);

    // メール送信
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@yourdomain.com",
      to: process.env.TO_EMAIL || "contact@yourdomain.com",
      subject: `お問い合わせ: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            新しいお問い合わせが届きました
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">お名前</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
              ${validatedData.name}
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">メールアドレス</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
              ${validatedData.email}
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">件名</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
              ${validatedData.subject}
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 10px;">メッセージ</h3>
            <div style="white-space: pre-wrap;">${validatedData.message}</div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
            このメールは自動送信されています。
          </div>
        </div>
      `,
      replyTo: validatedData.email,
    });

    // 送信者への自動返信メール
    const autoReplyResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@yourdomain.com",
      to: validatedData.email,
      subject: "お問い合わせを受け付けました",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            お問い合わせありがとうございます
          </h2>
          
          <p style="margin: 20px 0; line-height: 1.6;">
            ${validatedData.name} 様
          </p>
          
          <p style="margin: 20px 0; line-height: 1.6;">
            この度は、お問い合わせいただきありがとうございます。<br>
            以下の内容でお問い合わせを受け付けいたしました。
          </p>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h3 style="color: #555; margin-bottom: 10px;">件名</h3>
            <p style="margin: 0 0 15px 0;">${validatedData.subject}</p>
            
            <h3 style="color: #555; margin-bottom: 10px;">メッセージ</h3>
            <div style="white-space: pre-wrap;">${validatedData.message}</div>
          </div>
          
          <p style="margin: 20px 0; line-height: 1.6;">
            内容を確認次第、ご連絡させていただきます。<br>
            しばらくお待ちください。
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
            このメールは自動送信されています。心当たりがない場合は、このメールを破棄してください。
          </div>
        </div>
      `,
    });

    if (emailResult.error || autoReplyResult.error) {
      console.error(
        "メール送信エラー:",
        emailResult.error || autoReplyResult.error,
      );
      return {
        success: false,
        message:
          "メール送信に失敗しました。しばらく時間をおいて再度お試しください。",
      };
    }

    return {
      success: true,
      message: "お問い合わせを受け付けました。ありがとうございます。",
    };
  } catch (error) {
    console.error("お問い合わせ送信エラー:", error);

    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return {
        success: false,
        message: "入力内容に不備があります。",
        errors,
      };
    }

    return {
      success: false,
      message: "エラーが発生しました。しばらく時間をおいて再度お試しください。",
    };
  }
};
