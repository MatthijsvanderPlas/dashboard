import { MdOutlineMail, MdOutlineTextsms, MdOutlineWorkOutline } from 'react-icons/md';
import PersonalInfo from '../../public/info.json';
import Avatar from './Avatar';

function StudentInfo({ student, full }: { student: string; full: string | null }) {
  return (
    <div className='flex relative p-4 flex-col mx-auto lg:w-4/5 max-w-7xl'>
      {PersonalInfo.filter((info) => info.first_name === student).map((info) => (
        <div key={student} className='flex flex-row max-w-4xl  justify-start'>
          <div className='min-w-[100px] my-auto  mr-1'>
            <Avatar student={student} />
          </div>
          <div className='flex flex-col leading-loose pt-5'>
            <span className='text-xl font-bold'>
              {info.first_name} {info.last_name}
            </span>
            {full && (
              <>
                <div className='flex items-center'>
                  <span className='pr-1'>
                    <MdOutlineWorkOutline />
                  </span>
                  <span> : {info.job_title}</span>
                </div>
                <div className='flex items-center '>
                  <span className='pr-1'>
                    <MdOutlineMail />
                  </span>
                  <span className='break-all'> : {info.email}</span>
                </div>
                <div className='flex items-center'>
                  <span className='pr-1 pt-2  self-start'>
                    <MdOutlineTextsms />
                  </span>
                  <span>: {info.phrase}</span>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentInfo;
