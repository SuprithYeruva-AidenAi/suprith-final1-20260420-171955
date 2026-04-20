import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NoticeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="#dc3545" />
      <text x="8" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">!</text>
    </svg>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLoginSubmit = () => {
    let hasError = false;
    if (!username.trim()) {
      setUsernameError('Username is required');
      hasError = true;
    } else {
      setUsernameError('');
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }
    if (hasError) return;
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans]">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT: Login Screen */}
        <div
          className="flex-1 flex flex-col items-center justify-center p-[24px] md:p-[48px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff'
          }}
        >
          {!showLogin ? (
            <>
              <div
                className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)'
                }}
              >
                {/* Header */}
                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PSA09KnD8BDeEeZZ6cI~VtwcDg22Moj9P1AO5xeTXiY2OJx-KvohRLWP4pKNn82Yr9ydUl6NcjVgbc1hOwTD-Rywd-d1OnxemrSTgf0-pXlYz2parVqr49Sw1Gd3dnsRg-BLI3dWeI-TMa4dM1GVL74lZlH3ygrKx6Pyviq5vT9DPYqXEAmP0yu0I2USnzJAuFiD3vJXUmm2IbHEPc~ku69IKXveWcnCROgUSCdGQACnO4zfr-rq1g5~bkr-vOTF8SXKiVIeC8AwGjYJngONCgc41BfkoJhM1VotERpKTJfol4vxIaO~zccPFywRiKydECQS7nU0gULQlDtMU-VHFw__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]">Welcome to UOI Customer Portal</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121]">Manage all your policies in one portal.</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-center gap-[24px] w-full">
                  {/* Singpass button image */}
                  <img
                    src="https://s3-alpha-sig.figma.com/img/5066/4d16/b727ff45ca18ad961c6d3df8c1fcd1b3?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T99Zkl8Ul4ZPD57IcP~nmkyvoWMjdWzGjwDfM0WxUUxohCIwlrp6wCw7~eiVRGG4Y9Y8EFTgQu2EXiCQFhBMNOvTyPMyMwAjWH0QYfqyqvEwOxM7I~1Xd1SP2g-5napSfBfwmGuCl0LZ5YDFMdkB-pO9N7WmaTwAg0Rh-gS8TiDsuCeTtUP4zqrK783J5Y-fbOxW0uk6lNpun6e3CcL0RrAPclCdF7AUNpnD3g2A9gcWQ35fv4WkauJzct5oJxnbxZpsQEQ46t2elwxzwc~8h6PrGxuFOmCbPU0NAWv~39IBMM-eEgVcGqKPC-fVXevgJWLrJw1mgdAv9Iggf7bjwg__"
                    alt="Log in with Singpass"
                    className="w-[200px] h-[42px] object-contain cursor-pointer"
                    onClick={() => navigate('/dashboard')}
                  />

                  {/* Or divider */}
                  <div className="flex items-center gap-[16px] w-full">
                    <div className="flex-1 h-px bg-[#e0e0e0]" />
                    <span className="text-[16px] leading-[24px] text-center text-[#212121]">or</span>
                    <div className="flex-1 h-px bg-[#e0e0e0]" />
                  </div>

                  {/* NRIC/FIN button */}
                  <button
                    onClick={() => setShowLogin(true)}
                    className="w-[200px] h-[42px] flex items-center justify-center px-[16px] py-[12px] gap-[10px] bg-white rounded-[8px] border border-[#005eb8] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <span className="text-[16px] font-medium leading-[24px] text-[#005eb8]">Log in with NRIC/FIN</span>
                  </button>
                </div>
              </div>

              {/* Below card links */}
              <div className="w-full max-w-[420px] flex flex-col gap-[12px] mt-[24px]">
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  Don&apos;t have an account?{' '}
                  <span
                    className="text-[#005eb8] underline cursor-pointer"
                    onClick={() => navigate('/create-account')}
                  >
                    Create an account
                  </span>
                </p>
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  If you&apos;re experiencing login issues, please contact us at{' '}
                  <a href="mailto:help@uoi.com.sg" className="text-[#005eb8]">help@uoi.com.sg.</a>
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)'
                }}
              >
                {/* Header */}
                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PSA09KnD8BDeEeZZ6cI~VtwcDg22Moj9P1AO5xeTXiY2OJx-KvohRLWP4pKNn82Yr9ydUl6NcjVgbc1hOwTD-Rywd-d1OnxemrSTgf0-pXlYz2parVqr49Sw1Gd3dnsRg-BLI3dWeI-TMa4dM1GVL74lZlH3ygrKx6Pyviq5vT9DPYqXEAmP0yu0I2USnzJAuFiD3vJXUmm2IbHEPc~ku69IKXveWcnCROgUSCdGQACnO4zfr-rq1g5~bkr-vOTF8SXKiVIeC8AwGjYJngONCgc41BfkoJhM1VotERpKTJfol4vxIaO~zccPFywRiKydECQS7nU0gULQlDtMU-VHFw__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]">Log In</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121]">Enter your credentials to access your account.</p>
                </div>

                {/* Login fields */}
                <div className="flex flex-col gap-[16px] w-full">
                  {/* Username */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121]">Username / NRIC</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => { setUsername(e.target.value); if (usernameError) setUsernameError(''); }}
                      className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${
                        usernameError ? 'border-[#dc3545]' : 'border-[#000000]'
                      } text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]`}
                    />
                    {usernameError && (
                      <div className="flex items-center gap-[8px]">
                        <NoticeIcon />
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{usernameError}</span>
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121]">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                      className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${
                        passwordError ? 'border-[#dc3545]' : 'border-[#000000]'
                      } text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]`}
                    />
                    {passwordError && (
                      <div className="flex items-center gap-[8px]">
                        <NoticeIcon />
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{passwordError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleLoginSubmit}
                  className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] text-[16px] font-medium leading-[24px] text-white cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Submit
                </button>

                <button
                  onClick={() => { setShowLogin(false); setUsername(''); setPassword(''); setUsernameError(''); setPasswordError(''); }}
                  className="text-[14px] leading-[21px] text-[#005eb8] underline cursor-pointer bg-transparent border-none"
                >
                  Back
                </button>
              </div>

              {/* Below card links */}
              <div className="w-full max-w-[420px] flex flex-col gap-[12px] mt-[24px]">
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  Don&apos;t have an account?{' '}
                  <span
                    className="text-[#005eb8] underline cursor-pointer"
                    onClick={() => navigate('/create-account')}
                  >
                    Create an account
                  </span>
                </p>
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  If you&apos;re experiencing login issues, please contact us at{' '}
                  <a href="mailto:help@uoi.com.sg" className="text-[#005eb8]">help@uoi.com.sg.</a>
                </p>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: Hero image */}
        <div className="hidden md:block md:flex-1 relative">
          <img
            src="https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H00wquIZQgvNNauemHlj5DS3GK9TQAHVTFPNXuJuio2vZU5gpckw6RlTXCJ823SDilRVgzDpfSCNaWJtD71lVVCcPCWD2hlxHiScyTmkLpBPch4FP73XZgwU6SbM3bQ4IF42KFXQhbwlGeNjF0DHI2OAC2QNznkgUIi2EoyN~xUvI89J2yvyDRBfQOhswbKQDpfGT-pJgS5ry6aPd6efpRVieEXts4SodSQFVVr8hWXZnzknSJGqIp~YY08O9D0xFIbL0MtGdRKmWxrMoflt42EistrpuQjVlPlZqC39pSxtEQpDutH7pGmmamaRVcxNzhCxKM91shYxIoZL5khiAw__"
            alt="Travel"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex flex-row items-center justify-between px-[24px] py-[16px] bg-[#005eb8] shrink-0">
        <span className="text-[14px] leading-[21px] text-white">Copyright &copy; 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
        <span className="text-[14px] leading-[21px] text-right text-white">All Rights Reserved.</span>
      </div>
    </div>
  );
}
