import { Resend } from 'resend';
import dotenv from 'dotenv'

const waktu = new Date()
dotenv.config()

const resend = new Resend(process.env.PASSGMAIL);

async function sayalawan(nimnya, pengaduannya) {
  const { data, error } = await resend.emails.send({
    from: 'PENGADUAN MATISI <noreply@panggalihhhhhh.my.id>',
    to: [process.env.EMAILPENERIMA],
    subject: `PENGADUAN MATISI DARI MAHASISWA: ${nimnya}`,
    html: `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Pesan Baru</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td align="center"
            style="background:#2563eb;padding:35px;color:white;">
            <h1 style="margin:0;font-size:28px;">
              📩 Pesan Baru
            </h1>
            <p style="margin-top:10px;opacity:0.9;">
              Ada pesan baru yang masuk ke sistem.
            </p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:35px;">

            <table width="100%" cellpadding="0" cellspacing="0"
              style="border-collapse:collapse;">

              <tr>
                <td
                  style="padding:12px;background:#f8fafc;border:1px solid #e5e7eb;font-weight:bold;width:180px;">
                  Nama / NIM
                </td>

                <td
                  style="padding:12px;border:1px solid #e5e7eb;">
                  ${nimnya}
                </td>
              </tr>

              <tr>
                <td
                  style="padding:12px;background:#f8fafc;border:1px solid #e5e7eb;font-weight:bold;">
                  Pesan
                </td>

                <td
                  style="padding:12px;border:1px solid #e5e7eb;line-height:1.7;">
                  ${pengaduannya}
                </td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            style="padding:20px;background:#f8fafc;text-align:center;color:#6b7280;font-size:13px;">
            Email ini dikirim secara otomatis oleh sistem.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>

`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};

export default sayalawan;