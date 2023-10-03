import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Login = () => {
    const router = useRouter();
    let faceio;
  useEffect(() => {
    faceio = new faceIO('fioa07bc');
    console.log("FACEIO",faceio)
    handleLogIn();
  }, []);

    const handleLogIn = async () => {
        try {
          let response = await faceio.authenticate({
            locale: 'auto',
          });
    console.log(` Unique Facial ID: ${response.facialId}
            PayLoad: ${response.payload}
            `);
    
        console.log("Vandhuten naaa");
        router.push('/Home')
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
        <div className="text-center">
            <h1 className={`text-4xl font-bold tracking-tight mt-12 animate-pulse text-slate-300 sm:text-6xl ${inter.className}`}>Loggin' you in...</h1>
        </div>
    </div>
  )
}

export default Login