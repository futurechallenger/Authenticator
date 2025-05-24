// 在文件顶部添加以下依赖
import jsSHA from "jssha";

export function parseQRStringInfo(url: string): { [key: string]: string } {
  const queryParams = getQueryParams(url);
  const account = getTOTPAccount(url);

  return {
    ...queryParams,
    account,
  };
}

export function getQueryParams(url: string): { [key: string]: string } {
  const params = new URLSearchParams(url.split("?")[1]);
  const result: { [key: string]: string } = {};
  params.forEach((value, key) => {
    result[key] = decodeURIComponent(value);
  });
  return result;
}

export const getTOTPAccount = (uri: string): string => {
  // 解码并分割 URI 各部分
  const url = new URL(uri);
  const path = decodeURIComponent(url.pathname);

  // 从路径中提取账户名（格式为 totp/Issuer:AccountName）
  const accountPart = path.split("totp/")[1];
  const [_, account] = accountPart.includes(":")
    ? accountPart.split(":")
    : [null, accountPart];

  return account.split("?")[0];
};

// 添加Base32解码函数
export const base32Decode = (base32: string): Uint8Array => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  base32 = base32.replace(/=+$/, "").toUpperCase();
  const bytes: number[] = [];
  let bits = 0;
  let value = 0;

  for (const char of base32) {
    const index = alphabet.indexOf(char);
    if (index === -1) throw new Error("Invalid base32 character");
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >>> bits) & 0xff);
    }
  }
  return new Uint8Array(bytes);
};

// 完整的TOTP生成函数
export const generateTOTP = (secret: string, interval: number = 30) => {
  const key = base32Decode(secret);
  const epoch = Math.floor(Date.now() / 1000);
  const counter = Math.floor(epoch / interval);

  // 生成8字节的counter buffer（大端序）
  const buffer = new DataView(new ArrayBuffer(8));
  buffer.setUint32(4, counter);

  // 计算HMAC-SHA1
  const sha = new jsSHA("SHA-1", "ARRAYBUFFER");
  sha.setHMACKey(key.buffer as ArrayBuffer, "ARRAYBUFFER");
  sha.update(buffer.buffer);
  const hmac = new Uint8Array(sha.getHMAC("ARRAYBUFFER"));

  // 动态截断
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const code = binary % 1000000;
  const remaining = interval - (epoch % interval);

  return {
    code: code.toString().padStart(6, "0"),
    remaining,
  };
};
