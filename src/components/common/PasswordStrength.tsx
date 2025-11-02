import { Check, X } from "lucide-react";

export type StrengthLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type Rule = {
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  specialChar: boolean;
};

interface IPasswordStrenghtProps {
  strength: StrengthLevel;
  rules: Rule;
}

const PasswordStrength = ({ strength, rules }: IPasswordStrenghtProps) => {
  const getStrengthLabel = (value: number) => {
    if (value <= 2) return "Weak";
    if (value === 3) return "Fair";
    if (value === 4) return "Good";
    return "Strong";
  };

  const strengthColor: Record<StrengthLevel, string> = {
    0: "red",
    1: "red",
    2: "red",
    3: "#FBC116",
    4: "#9E49EC",
    5: "green",
  };
  return (
    <div>
      {strength > 0 && (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center font-semibold">
              <h2>Password Strength</h2>
              <p style={{ color: strengthColor[strength] }}>
                {getStrengthLabel(strength)}
              </p>
            </div>
            {strength > 0 && (
              <div
                style={{
                  backgroundColor: strengthColor[strength],
                  width: `${(strength / 5) * 100}%`,
                }}
                className="h-2 bg-red-400 rounded-full ${strength?"
              />
            )}
          </div>
          <div className="bg-gray-100 p-3 mt-3 rounded-xl">
            <div>
              <h2 className="font-semibold">Password Requirement</h2>
              <div className="flex flex-wrap">
                <div className="flex gap-1 items-center mt-2 min-w-1/2">
                  {rules.length ? (
                    <Check color="green" size={20} />
                  ) : (
                    <X color="red" size={20} />
                  )}
                  <span className={rules.length ? "text-green-800" : ""}>
                    At least 8 Characters
                  </span>
                </div>
                <div className="flex gap-1 items-center mt-2 min-w-1/2">
                  {rules.lowercase ? (
                    <Check color="green" size={20} />
                  ) : (
                    <X color="red" size={20} />
                  )}
                  <span className={rules.lowercase ? "text-green-800" : ""}>
                    Contains lowercase letter
                  </span>
                </div>
                <div className="flex gap-1 items-center mt-2 min-w-1/2">
                  {rules.specialChar ? (
                    <Check color="green" size={20} />
                  ) : (
                    <X color="red" size={20} />
                  )}
                  <span className={rules.specialChar ? "text-green-800" : ""}>
                    Contains special character
                  </span>
                </div>
                <div className="flex gap-1 items-center mt-2 min-w-1/2">
                  {rules.uppercase ? (
                    <Check color="green" size={20} />
                  ) : (
                    <X color="red" size={20} />
                  )}
                  <span className={rules.uppercase ? "text-green-800" : ""}>
                    Contains uppercase letter
                  </span>
                </div>
                <div className="flex gap-1 items-center mt-2 min-w-1/2">
                  {rules.number ? (
                    <Check color="green" size={20} />
                  ) : (
                    <X color="red" size={20} />
                  )}
                  <span className={rules.number ? "text-green-800" : ""}>
                    Contains number
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordStrength;
