"use client"

import { useState, type Dispatch, type SetStateAction, useCallback } from "react"
import { signIn } from "next-auth/react"
import Image from "next/image"

import Modal from "@/components/shared/modal"
import { LoadingDots, Google } from "@/components/shared/icons"

type SignInModalProps = {
  showSignInModal: boolean
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
}

const SignInModal = ({ showSignInModal, setShowSignInModal }: SignInModalProps) => {
  const [signInClicked, setSignInClicked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    try {
      setSignInClicked(true)
      setError(null)
      await signIn("google")
    } catch (err) {
      setError("Failed to sign in. Please try again.")
      setSignInClicked(false)
    }
  }

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev" aria-label="Home">
            <Image src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" width={40} height={40} priority />
          </a>
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile picture will be stored.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}
          <button
            disabled={signInClicked}
            className={`flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-gray-200 bg-white text-black hover:bg-gray-50"
            }`}
            onClick={handleSignIn}
            aria-label="Sign in with Google"
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Google className="h-5 w-5" />
                <span>Sign In with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false)

  // Only re-create the modal component when showSignInModal changes
  const SignInModalCallback = useCallback(
    () => <SignInModal showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />,
    [showSignInModal],
  )

  return {
    setShowSignInModal,
    SignInModal: SignInModalCallback,
  }
}

// import Modal from "@/components/shared/modal";
// import { signIn } from "next-auth/react";
// import {
//   useState,
//   Dispatch,
//   SetStateAction,
//   useCallback,
//   useMemo,
// } from "react";
// import { LoadingDots, Google } from "@/components/shared/icons";
// import Image from "next/image";

// const SignInModal = ({
//   showSignInModal,
//   setShowSignInModal,
// }: {
//   showSignInModal: boolean;
//   setShowSignInModal: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const [signInClicked, setSignInClicked] = useState(false);

//   return (
//     <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
//       <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
//         <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
//           <a href="https://precedent.dev">
//             <Image
//               src="/logo.png"
//               alt="Logo"
//               className="h-10 w-10 rounded-full"
//               width={20}
//               height={20}
//             />
//           </a>
//           <h3 className="font-display text-2xl font-bold">Sign In</h3>
//           <p className="text-sm text-gray-500">
//             This is strictly for demo purposes - only your email and profile
//             picture will be stored.
//           </p>
//         </div>

//         <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
//           <button
//             disabled={signInClicked}
//             className={`${
//               signInClicked
//                 ? "cursor-not-allowed border-gray-200 bg-gray-100"
//                 : "border border-gray-200 bg-white text-black hover:bg-gray-50"
//             } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
//             onClick={() => {
//               setSignInClicked(true);
//               signIn("google");
//             }}
//           >
//             {signInClicked ? (
//               <LoadingDots color="#808080" />
//             ) : (
//               <>
//                 <Google className="h-5 w-5" />
//                 <p>Sign In with Google</p>
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export function useSignInModal() {
//   const [showSignInModal, setShowSignInModal] = useState(false);

//   const SignInModalCallback = useCallback(() => {
//     return (
//       <SignInModal
//         showSignInModal={showSignInModal}
//         setShowSignInModal={setShowSignInModal}
//       />
//     );
//   }, [showSignInModal, setShowSignInModal]);

//   return useMemo(
//     () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
//     [setShowSignInModal, SignInModalCallback],
//   );
// }
