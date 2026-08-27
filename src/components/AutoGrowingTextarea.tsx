import React, { useEffect, useRef } from 'react';

interface AutoGrowingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export const AutoGrowingTextarea: React.FC<AutoGrowingTextareaProps> = ({
  value,
  onChange,
  error,
  placeholder,
  className = '',
  id,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(56, textarea.scrollHeight)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="w-full relative">
      <textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e);
          adjustHeight();
        }}
        placeholder={placeholder}
        rows={2}
        className={`w-full min-h-[56px] px-4 py-3.5 text-[15px] sm:text-base leading-relaxed bg-[#FAF8F5] border rounded-xl 
          transition-all duration-200 resize-none text-[#162420] placeholder-[#8A958F] outline-none
          ${
            error
              ? 'border-red-400/80 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200/50'
              : 'border-[#E0D8CE] focus:border-[#C5A880] focus:bg-white focus:ring-2 focus:ring-[#C5A880]/20'
          } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
};
