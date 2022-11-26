import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import Cookies from 'js-cookie'
import { IAMCredentials } from '@/interfaces'
import aws4 from 'aws4';

export const IAMAuthorizedQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string,
      method: string
      // data?: AxiosRequestConfig['data']
      // params?: AxiosRequestConfig['params'],
    },
    unknown,
    unknown
  > =>
  async ({ url, method }) => {
    const fullUrl = baseUrl + url
    return await executeSignedRequest(fullUrl, method);
  }

const getCredentials = (): IAMCredentials  => {
  const credentials = Cookies.get('credentials');
  if (credentials) {
    const decoded = decodeURI(credentials);
    return JSON.parse(decoded).data;
  }
  return {
    AccessKeyId: '',
    SecretAccessKey: '',
    SessionToken: '',
    Expiration: ''
  };
}

const signRequest = (method: string, credentials: IAMCredentials) => {
  return aws4.sign({
    service: 'execute-api',
    region: import.meta.env.VITE_RIGION,
    path: `/${import.meta.env.VITE_ENV}/`,
    host: `${import.meta.env.VITE_API_ID}.execute-api.${import.meta.env.VITE_REGION}.amazonaws.com`,
    method
  },
  {
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: credentials.SecretAccessKey,
    sessionToken: credentials.SessionToken
  });
}

async function executeSignedRequest(baseUrl: string, method: string = 'POST') {
  const credentials = getCredentials();
  const request = signRequest(method, credentials)
  const response = await fetch(
    baseUrl,
    {
      headers: {
        Authorization: request.headers?.Authorization?.toString() ?? '',
        "X-Amz-Security-Token": request.headers?.["X-Amz-Security-Token"]?.toString() ?? '',
        "X-Amz-Date": request.headers?.["X-Amz-Date"]?.toString() ?? ''
      },
      method,
    }
  );
  if (response.status !== 200) {
    throw new Error(await response.text());
  }
  return await response.json();
}