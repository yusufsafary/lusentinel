export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="16" cy="16" r="14.5" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
      {/* Middle ring */}
      <circle cx="16" cy="16" r="9" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
      {/* Inner ring */}
      <circle cx="16" cy="16" r="4.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
      {/* Center dot */}
      <circle cx="16" cy="16" r="1.8" fill="white" />
      {/* Orbital dots */}
      <circle cx="16" cy="2" r="1.5" fill="white" fillOpacity="0.9" />
      <circle cx="30" cy="16" r="1.2" fill="white" fillOpacity="0.5" />
      <circle cx="16" cy="30" r="1" fill="white" fillOpacity="0.35" />
      <circle cx="2" cy="16" r="1.2" fill="white" fillOpacity="0.5" />
      {/* Diagonal dots */}
      <circle cx="26.2" cy="5.8" r="1" fill="white" fillOpacity="0.4" />
      <circle cx="5.8" cy="26.2" r="0.8" fill="white" fillOpacity="0.25" />
    </svg>
  );
}
