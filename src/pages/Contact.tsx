/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: { preventDefault: () => void }) => {
    setSubmitting(true);
    e.preventDefault();

    emailjs.sendForm('gmail', 'contact', form.current as HTMLFormElement, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
        form.current?.reset();
        setSubmitting(false);
      },
      (error) => {
        console.log(error.text);
        setSubmitting(false);
      },
    );
  };

  return (
    <>
      <div className='flex p-4 mt-10 max-w-[75ch] mx-auto'>
        For any questions or remarks please use this form to contact us.
      </div>
      <form
        className='flex flex-col p-4 pt-0 mx-auto  mb-14  lg:w-4/5  max-w-[75ch]  leading-relaxed'
        ref={form}
        onSubmit={sendEmail}
      >
        <label className='p-1'>Name:</label>
        <input
          className='p-1 border-[1px] rounded-md m-1'
          type='text'
          name='from_name'
          id='from_name'
          placeholder='John Doe'
          required
        />
        <label className='p-1'>Email:</label>
        <input
          className='p-1 border-[1px] rounded-md m-1'
          type='email'
          name='reply_to'
          id='reply_to'
          placeholder='example@gmail.com'
          required
        />
        <label className='p-1'>Message:</label>
        <textarea
          className='min-h-[150px] p-1 border-[1px] rounded-md m-1'
          name='message'
          id='message'
          placeholder='Enter text here...'
          required
        />
        <input
          className={`border-[1px] p-1 m-1 bg-orange-300 rounded-md shadow-sm cursor-pointer active:shadow-inner ${
            submitting ? 'bg-slate-50' : ''
          }`}
          type='submit'
          value='Send'
          disabled={submitting}
        />
      </form>
    </>
  );
}

export default Contact;
