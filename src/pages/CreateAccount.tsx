import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronLeft, Eye, EyeOff } from 'lucide-react';

type Step = 'form' | 'otp' | 'setPassword';

function SuccessCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="#38A169" />
      <path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UncheckedCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7.5" stroke="#8d8d8d" />
    </svg>
  );
}

function NoticeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="#dc3545" />
      <text x="8" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">!</text>
    </svg>
  );
}

export default function CreateAccount() {
  const navigate = useNavigate();

  // Step state
  const [step, setStep] = useState<Step>('form');

  // Form fields
  const [nric, setNric] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // OTP
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpToast, setShowOtpToast] = useState(false);

  // Password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Password requirements
  const hasMinLength = password.length >= 8;
  const hasUpperAndLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*]/.test(password);
  const passwordMeetsRequirements = hasMinLength && hasUpperAndLower && hasNumberOrSymbol;

  // Show Get OTP button when email is filled
  const showGetOtp = email.length > 0 && !otpSent;

  // Auto-dismiss OTP toast
  useEffect(() => {
    if (showOtpToast) {
      const timer = setTimeout(() => setShowOtpToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showOtpToast]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleGetOtp = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    setEmailError('');
    setOtpSent(true);
    setShowOtpToast(true);
  };

  const handleNextStep1 = () => {
    if (!email) {
      setEmailError('Invalid email address');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    if (!otpSent) {
      setEmailError('');
      setOtpSent(true);
      setShowOtpToast(true);
      return;
    }
    // Move to OTP step (already shown inline)
    setEmailError('');
    setStep('otp');
  };

  const handleNextOtp = () => {
    if (!otp) {
      setOtpError('Invalid OTP');
      return;
    }
    setOtpError('');
    setStep('setPassword');
  };

  const handleCreateAccount = () => {
    let hasError = false;

    if (!passwordMeetsRequirements) {
      setPasswordError('Password must be at least 8 characters and include letters and numbers.');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Password do not match, try again.');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (hasError) return;

    setTimeout(() => navigate('/'), 800);
  };

  const isFormStep = step === 'form';
  const isOtpStep = step === 'otp';
  const isPasswordStep = step === 'setPassword';

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans]">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT PANEL */}
        <div
          className="flex-1 flex flex-col items-center justify-center p-[24px] md:p-[48px] relative"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff'
          }}
        >
          {/* OTP Toast */}
          {showOtpToast && (
            <div className="absolute top-[24px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-auto flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] z-50" style={{left: '50%', transform: 'translateX(-50%)'}}>
              <SuccessCircle />
              <span className="text-[14px] leading-[21px] text-[#212121]">OTP sent to email address.</span>
            </div>
          )}

          {/* FORM CARD — Step 1 & OTP inline */}
          {(isFormStep || isOtpStep) && (
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
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]">Create Account</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121]">Check that information you provide is accurate before proceeding.</p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-[16px] w-full">
                  {/* NRIC/FIN */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121]">NRIC/FIN</label>
                    <input
                      type="text"
                      value={nric}
                      onChange={(e) => setNric(e.target.value)}
                      className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121]">Date of Birth</label>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8] pr-[48px]"
                      />
                      <Calendar className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] text-[#212121] pointer-events-none" />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121]">Email Address</label>
                    <div className={`flex items-center w-full h-auto min-h-[48px] px-[16px] py-[12px] gap-[8px] bg-white rounded-[8px] border ${emailError ? 'border-[#dc3545]' : 'border-[#000000]'}`}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none"
                      />
                      {showGetOtp && (
                        <button
                          onClick={handleGetOtp}
                          className="shrink-0 px-[16px] py-[8px] bg-white rounded-[8px] border border-[#005eb8] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] text-[14px] font-medium leading-[21px] text-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          Get OTP
                        </button>
                      )}
                      {otpSent && !showGetOtp && (
                        <button
                          onClick={() => { setShowOtpToast(true); }}
                          className="shrink-0 px-[16px] py-[8px] bg-white rounded-[8px] border border-[#005eb8] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] text-[14px] font-medium leading-[21px] text-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          Resend
                        </button>
                      )}
                    </div>
                    {emailError && (
                      <div className="flex items-center gap-[8px]">
                        <NoticeIcon />
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{emailError}</span>
                      </div>
                    )}

                    {/* OTP field — shown after OTP sent */}
                    {otpSent && (
                      <div className="flex flex-col gap-[12px] w-full">
                        <div className={`flex items-center w-full h-[48px] px-[16px] py-[12px] gap-[8px] bg-white rounded-[8px] border ${otpError ? 'border-[#dc3545]' : 'border-[#000000]'}`}>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => { setOtp(e.target.value); if (otpError) setOtpError(''); }}
                            placeholder="Enter code"
                            className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none placeholder:text-[#8d8d8d]"
                          />
                        </div>
                        {otpError && (
                          <div className="flex items-center gap-[8px]">
                            <NoticeIcon />
                            <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{otpError}</span>
                          </div>
                        )}
                        <p className="text-[14px] leading-[21px] text-[#0d6efd]">
                          Didn't receive a code?{' '}
                          <span
                            className="cursor-pointer underline"
                            onClick={() => { setShowOtpToast(true); }}
                          >
                            Resend
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => {
                    if (!otpSent) {
                      handleGetOtp();
                    } else {
                      handleNextOtp();
                    }
                  }}
                  className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] text-[16px] font-medium leading-[24px] text-white cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Next
                </button>
              </div>

              {/* Below card */}
              <div className="w-full max-w-[420px] flex flex-col gap-[12px] mt-[24px]">
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  Already have an account?{' '}
                  <span
                    className="text-[#005eb8] underline cursor-pointer"
                    onClick={() => navigate('/')}
                  >
                    Log in
                  </span>
                </p>
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  If you're experiencing login issues, please contact us at{' '}
                  <a href="mailto:help@uoi.com.sg" className="text-[#005eb8]">help@uoi.com.sg.</a>
                </p>
              </div>
            </>
          )}

          {/* SET PASSWORD CARD */}
          {isPasswordStep && (
            <>
              <div
                className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)'
                }}
              >
                {/* Back button */}
                <div
                  className="flex items-center gap-[4px] w-full cursor-pointer"
                  onClick={() => { setStep('form'); setPassword(''); setConfirmPassword(''); setPasswordError(''); setConfirmPasswordError(''); }}
                >
                  <ChevronLeft className="w-[20px] h-[20px] text-[#6e6e6e]" />
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e]">Back</span>
                </div>

                {/* Header */}
                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PSA09KnD8BDeEeZZ6cI~VtwcDg22Moj9P1AO5xeTXiY2OJx-KvohRLWP4pKNn82Yr9ydUl6NcjVgbc1hOwTD-Rywd-d1OnxemrSTgf0-pXlYz2parVqr49Sw1Gd3dnsRg-BLI3dWeI-TMa4dM1GVL74lZlH3ygrKx6Pyviq5vT9DPYqXEAmP0yu0I2USnzJAuFiD3vJXUmm2IbHEPc~ku69IKXveWcnCROgUSCdGQACnO4zfr-rq1g5~bkr-vOTF8SXKiVIeC8AwGjYJngONCgc41BfkoJhM1VotERpKTJfol4vxIaO~zccPFywRiKydECQS7nU0gULQlDtMU-VHFw__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]">Set Password</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121]">Enter a password for your new account.</p>
                </div>

                {/* Password fields */}
                <div className="flex flex-col gap-[16px] w-full">
                  {/* Password */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121]">Password</label>
                    <div className={`flex items-center w-full h-[48px] px-[16px] py-[12px] gap-[8px] bg-white rounded-[8px] border ${passwordError ? 'border-[#dc3545]' : 'border-[#000000]'}`}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(''); }}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="shrink-0 cursor-pointer"
                        type="button"
                      >
                        {showPassword ? (
                          <EyeOff className="w-[24px] h-[24px] text-[#212121]" />
                        ) : (
                          <Eye className="w-[24px] h-[24px] text-[#212121]" />
                        )}
                      </button>
                    </div>
                    {passwordError && (
                      <div className="flex items-start gap-[8px]">
                        <div className="shrink-0 mt-[1px]"><NoticeIcon /></div>
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{passwordError}</span>
                      </div>
                    )}

                    {/* Password requirements — shown when no error */}
                    {!passwordError && (
                      <div className="flex flex-col gap-[8px]">
                        <p className="text-[12px] leading-[16.8px] text-[#6e6e6e]">Your password must contain at least:</p>
                        <div className="flex items-center gap-[8px]">
                          {hasMinLength ? <SuccessCircle /> : <UncheckedCircle />}
                          <span className="text-[12px] leading-[16.8px] text-[#6e6e6e]">8 characters</span>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          {hasUpperAndLower ? <SuccessCircle /> : <UncheckedCircle />}
                          <span className="text-[12px] leading-[16.8px] text-[#6e6e6e]">1 uppercase and lowercase letter</span>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          {hasNumberOrSymbol ? <SuccessCircle /> : <UncheckedCircle />}
                          <span className="text-[12px] leading-[16.8px] text-[#6e6e6e]">1 number or symbol (e.g. !, @, #)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121]">Confirm Password</label>
                    <div className={`flex items-center w-full h-[48px] px-[16px] py-[12px] gap-[8px] bg-white rounded-[8px] border ${confirmPasswordError ? 'border-[#dc3545]' : 'border-[#000000]'}`}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); if (confirmPasswordError) setConfirmPasswordError(''); }}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none"
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="shrink-0 cursor-pointer"
                        type="button"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-[24px] h-[24px] text-[#212121]" />
                        ) : (
                          <Eye className="w-[24px] h-[24px] text-[#212121]" />
                        )}
                      </button>
                    </div>
                    {confirmPasswordError && (
                      <div className="flex items-center gap-[8px]">
                        <NoticeIcon />
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{confirmPasswordError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Create Account Button */}
                <button
                  onClick={handleCreateAccount}
                  className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] text-[16px] font-medium leading-[24px] text-white cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Create Account
                </button>
              </div>

              {/* Below card */}
              <div className="w-full max-w-[420px] flex flex-col gap-[12px] mt-[24px]">
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  Already have an account?{' '}
                  <span
                    className="text-[#005eb8] underline cursor-pointer"
                    onClick={() => navigate('/')}
                  >
                    Log in
                  </span>
                </p>
                <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]">
                  If you're experiencing login issues, please contact us at{' '}
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
        <span className="text-[14px] leading-[21px] text-white">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
        <span className="text-[14px] leading-[21px] text-right text-white">All Rights Reserved.</span>
      </div>
    </div>
  );
}
