
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export const USER_API = publicRuntimeConfig.NEXT_PUBLIC_USER_BACKEND;
console.log("🚀 ~ file: backend.ts ~ line 5 ~ publicRuntimeConfig.NEXT_PUBLIC_USER_BACKEND", publicRuntimeConfig.NEXT_PUBLIC_USER_BACKEND)
export const CONTENT_API = publicRuntimeConfig.NEXT_PUBLIC_CONTENT_BACKEND;
console.log("🚀 ~ file: backend.ts ~ line 7 ~ publicRuntimeConfig.NEXT_PUBLIC_CONTENT_BACKEND", publicRuntimeConfig.NEXT_PUBLIC_CONTENT_BACKEND)

