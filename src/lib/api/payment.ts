import { api } from "./axios";
import type { CreatePaymentIntentResponse } from "@/types/payment";

export async function createSecondaryPaymentIntent() {
  const response =
    await api.post<CreatePaymentIntentResponse>(
      "/payments/create-payment-intent/paystack/secondary",
    );

  return response.data;
}





// // C:\Users\Lara Spellman\Jamb\jamb-league\src\lib\api\payment.ts

// import { axiosInstance } from "@/lib/api/axios";

// import { api } from "./axios";
// import type { CreatePaymentIntentResponse } from "@/types/payment";

// /* ============================================================
//    INITIALIZE PAYMENT
//    ============================================================ */

// export interface InitializePaymentRequest {
//   planId: string;
// }

// /* ============================================================
//    INITIALIZE PAYMENT RESPONSE
//    ============================================================ */

// export interface InitializePaymentData {
//   reference: string;

//   authorizationUrl: string;

//   accessCode?: string;

//   amount: number;

//   currency: string;

//   planId: string;
// }

// export interface InitializePaymentResponse {
//   success: boolean;

//   message: string;

//   data: InitializePaymentData;
// }

// /* ============================================================
//    VERIFY PAYMENT REQUEST
//    ============================================================ */

// export interface VerifyPaymentRequest {
//   reference: string;
// }

// /* ============================================================
//    VERIFY PAYMENT RESPONSE
//    ============================================================ */

// export interface VerifyPaymentData {
//   reference: string;

//   status: string;

//   amount: number;

//   currency: string;

//   paid: boolean;

//   planId?: string;
// }

// export interface VerifyPaymentResponse {
//   success: boolean;

//   message: string;

//   data: VerifyPaymentData;
// }

// /* ============================================================
//    INITIALIZE PAYMENT
//    ============================================================ */

// export async function initializePayment(
//   payload: InitializePaymentRequest,
// ): Promise<InitializePaymentResponse> {
//   const response =
//     await axiosInstance.post<InitializePaymentResponse>(
//       "/payments/initialize",
//       payload,
//     );

//   return response.data;
// }

// /* ============================================================
//    VERIFY PAYMENT
//    ============================================================ */

// export async function verifyPayment(
//   payload: VerifyPaymentRequest,
// ): Promise<VerifyPaymentResponse> {
//   const response =
//     await axiosInstance.post<VerifyPaymentResponse>(
//       "/payments/verify",
//       payload,
//     );

//   return response.data;
// }



// export async function createSecondaryPaymentIntent() {
//   const response =
//     await api.post<CreatePaymentIntentResponse>(
//       "/payments/create-payment-intent/paystack/secondary",
//     );

//   return response.data;
// }
