import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



const SignUpForm = () => {
  const router = useRouter();
  let faceio;
  useEffect(() => {
    faceio = new faceIO('fioa07bc');
    console.log("FACEIO",faceio)
  }, []);

  const onChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = (e) => {
    // prevents the submit button from refreshing the page
    e.preventDefault();
//just to confirm that payload has the info you may delete it after
    console.log("THIS IS YOUR PAYLOAD", payload);
    handleSignUp(payload);
};

  const handleSignUp = async (payload) => {
    faceio = new faceIO('fioa07bc');
    faceio.enroll({
			"locale": "auto", // Default user locale
			"userConsent": true, // Set to true if you have already collected user consent
			"payload": { "email": `${payload.userEmail}`, "pin":  `${payload.pin}` }
		}).then(userInfo => {
			// User Successfully Enrolled!
			alert(
			`User Successfully Enrolled! Details:
			Unique Facial ID: ${userInfo.facialId}
			Enrollment Date: ${userInfo.timestamp}
			Gender: ${userInfo.details.gender}
			Age Approximation: ${userInfo.details.age}`
			);
			console.log(userInfo);
      router.push('/Home.js')
			// handle success, save the facial ID, redirect to dashboard...
		}).catch(errCode => {

			faceio.restartSession();
      
		});


      };

  const [payload, setPayload] = useState({
    userEmail: '',
    pin: '',
  });
  return (
    <section className='h-full gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Face Authentication by FaceIO
                      </h4>
                    </div>
                    <form>
                      <p className='mb-4'>
                        Please Sign Up if you do not have an account
                      </p>
                      <div className='mb-4'>
                        <input
                          type='email'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Your Email'
                          name='userEmail'
                          defaultValue={payload.userEmail}
                          onChange = {onChange}
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Password'
                          name='pin'
                          defaultValue={payload.pin}
                          onChange = {onChange}
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className='flex items-center justify-between pb-6'>
                        <p className='mb-0 mr-2'>Do you have an account?</p>
                        <button
                          type='button'
                          className='inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                          onClick={handleLogIn}
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUpForm;