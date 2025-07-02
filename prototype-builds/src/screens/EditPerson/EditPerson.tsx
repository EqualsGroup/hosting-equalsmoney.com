import { CalendarIcon, InfoIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";

export const EditPerson = (): JSX.Element => {
  // Data for role cards
  const roles = [
    {
      title: "Director",
      icon: "/union-1.svg",
      bgColor: "bg-[#c2acff]",
      description: "",
      selected: true,
    },
    {
      title: "Ultimate Beneficial Owner",
      icon: "/union-1.svg",
      bgColor: "bg-[#9ebdfd]",
      description: "Person with 25% or more control",
      selected: true,
    },
  ];

  return (
    <div className="flex flex-col items-start relative bg-[#090b18] min-h-screen w-full">
      <header className="flex flex-col items-start gap-6 relative self-stretch w-full">
        <div className="flex flex-col items-start gap-4 pt-6 pb-0 px-6 relative self-stretch w-full">
          <div className="flex items-center gap-4 relative self-stretch w-full">
            <img
              className="relative h-8"
              alt="Em midnightblue"
              src="/em-midnightblue.svg"
            />
            <div className="flex flex-1 items-center justify-center gap-2.5 p-2" />
            <Button
              variant="ghost"
              className="w-10 h-10 p-0 bg-[#363842] rounded-lg"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  className="w-[13px] h-[13px]"
                  alt="Close"
                  src="/union-3.svg"
                />
              </div>
            </Button>
          </div>
        </div>
        <Separator className="w-full h-px" />
      </header>

      <main className="flex flex-col items-center gap-6 px-6 py-4 relative self-stretch w-full">
        <Card className="flex flex-col w-[508px] items-start gap-6 px-8 py-6 bg-transparent border-0 rounded-2xl">
          <div className="flex flex-col items-center gap-2 relative self-stretch w-full">
            <div className="flex flex-col gap-1 self-stretch w-full items-center">
              <h1 className="font-heading-medium font-[number:var(--heading-medium-font-weight)] text-[#f7f8fc] text-[length:var(--heading-medium-font-size)] tracking-[var(--heading-medium-letter-spacing)] leading-[var(--heading-medium-line-height)] [font-style:var(--heading-medium-font-style)]">
                Katie Holmes
              </h1>
              <p className="w-[441px] font-body-regular-large font-[number:var(--body-regular-large-font-weight)] text-[#bcbcc9] text-[length:var(--body-regular-large-font-size)] text-center tracking-[var(--body-regular-large-letter-spacing)] leading-[var(--body-regular-large-line-height)] [font-style:var(--body-regular-large-font-style)]">
                Edit Director and/or Ultimate Beneficial Owner details.
              </p>
            </div>
          </div>

          <Separator className="w-full h-px" />

          <CardContent className="flex flex-col items-center gap-6 p-0 w-full">
            <div className="flex flex-col items-start w-full bg-[#262835] rounded-xl overflow-hidden">
              {roles.map((role, index) => (
                <div
                  key={`role-${index}`}
                  className={`flex items-center gap-6 px-4 py-2 w-full ${index === 0 ? "border-b border-[#484a58]" : ""}`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`inline-flex items-center justify-center p-3 ${role.bgColor} rounded-[32px]`}
                      >
                        <div className="relative w-6 h-6">
                          <img
                            className="absolute w-[15px] h-[17px] top-[3px] left-1"
                            alt="Person icon"
                            src={role.icon}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[#f7f8fc] text-[length:var(--body-bold-medium-font-size)] tracking-[var(--body-bold-medium-letter-spacing)] leading-[var(--body-bold-medium-line-height)] [font-style:var(--body-bold-medium-font-style)]">
                          {role.title}
                        </div>
                        {role.description && (
                          <div className="h-4 font-body-regular-small font-[number:var(--body-regular-small-font-weight)] text-[#bcbcc9] text-[length:var(--body-regular-small-font-size)] tracking-[var(--body-regular-small-letter-spacing)] leading-[var(--body-regular-small-line-height)] whitespace-nowrap overflow-hidden text-ellipsis [font-style:var(--body-regular-small-font-style)]">
                            {role.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-6 h-6 items-center justify-center">
                    <div className="flex w-4 h-4 items-center justify-center bg-[#5da6ec] rounded overflow-hidden">
                      <img
                        className="w-4 h-4"
                        alt="Selected"
                        src="/tick-squared.svg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <label className="flex h-5 items-center gap-0.5 w-full">
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="inline-flex items-center gap-0.5 pt-0 pb-0.5 px-0">
                    <span className="font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[#f7f8fc] text-[length:var(--body-bold-medium-font-size)] tracking-[var(--body-bold-medium-letter-spacing)] leading-[var(--body-bold-medium-line-height)] [font-style:var(--body-bold-medium-font-style)]">
                      First and middle name(s)
                    </span>
                  </div>
                </div>
              </label>
              <div className="relative w-full">
                <Input
                  className="p-3 bg-transparent text-[#bcbcc9] border-[#484a58] rounded-lg font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[length:var(--body-bold-medium-font-size)]"
                  defaultValue="Katie"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                >
                  <XIcon className="h-2 w-2" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <label className="flex h-5 items-center gap-0.5 w-full">
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="inline-flex items-center gap-0.5 pt-0 pb-0.5 px-0">
                    <span className="font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[#f7f8fc] text-[length:var(--body-bold-medium-font-size)] tracking-[var(--body-bold-medium-letter-spacing)] leading-[var(--body-bold-medium-line-height)] [font-style:var(--body-bold-medium-font-style)]">
                      Last name
                    </span>
                  </div>
                </div>
              </label>
              <div className="relative w-full">
                <Input
                  className="p-3 bg-transparent text-[#bcbcc9] border-[#484a58] rounded-lg font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[length:var(--body-bold-medium-font-size)]"
                  defaultValue="Holmes"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                >
                  <XIcon className="h-2 w-2" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <label className="flex h-5 items-center gap-0.5 w-full">
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="inline-flex items-center gap-0.5 pt-0 pb-0.5 px-0">
                    <span className="font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[#f7f8fc] text-[length:var(--body-bold-medium-font-size)] tracking-[var(--body-bold-medium-letter-spacing)] leading-[var(--body-bold-medium-line-height)] [font-style:var(--body-bold-medium-font-style)]">
                      Date of birth
                    </span>
                  </div>
                </div>
              </label>
              <div className="relative w-full">
                <Input
                  className="p-3 pl-10 bg-transparent text-[#9699aa] border-[#484a58] rounded-lg font-body-regular-medium font-[number:var(--body-regular-medium-font-weight)] text-[length:var(--body-regular-medium-font-size)]"
                  placeholder="DD / MM / YYYY"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9699aa]" />
              </div>
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <label className="flex h-5 items-center gap-0.5 w-full">
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="inline-flex items-center gap-0.5 pt-0 pb-0.5 px-0">
                    <span className="font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[#f7f8fc] text-[length:var(--body-bold-medium-font-size)] tracking-[var(--body-bold-medium-letter-spacing)] leading-[var(--body-bold-medium-line-height)] [font-style:var(--body-bold-medium-font-style)]">
                      Nationality
                    </span>
                  </div>
                  <InfoIcon className="w-4 h-4 text-[#bcbcc9]" />
                </div>
              </label>
              <Select>
                <SelectTrigger className="p-3 bg-transparent text-[#9699aa] border-[#484a58] rounded-lg font-body-regular-medium font-[number:var(--body-regular-medium-font-weight)] text-[length:var(--body-regular-medium-font-size)]">
                  <SelectValue placeholder="Nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <label className="flex h-5 items-center gap-0.5 w-full">
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="inline-flex items-center gap-0.5 pt-0 pb-0.5 px-0">
                    <span className="font-body-bold-medium font-[number:var(--body-bold-medium-font-weight)] text-[#f7f8fc] text-[length:var(--body-bold-medium-font-size)] tracking-[var(--body-bold-medium-letter-spacing)] leading-[var(--body-bold-medium-line-height)] [font-style:var(--body-bold-medium-font-style)]">
                      Ownership percentage
                    </span>
                  </div>
                </div>
              </label>
              <Input
                className="p-3 bg-transparent text-[#9699aa] border-[#484a58] rounded-lg font-body-regular-medium font-[number:var(--body-regular-medium-font-weight)] text-[length:var(--body-regular-medium-font-size)]"
                defaultValue="25%"
              />
            </div>

            <div className="flex flex-col items-center gap-3 w-full">
              <Button className="w-full h-12 bg-[#ffb900] text-[#262835] rounded-xl hover:bg-[#ffb900]/90">
                <span className="[font-family:'Equals-SemiBold',Helvetica] font-semibold text-base text-center tracking-[0] leading-4">
                  Continue
                </span>
              </Button>
              <Button
                variant="secondary"
                className="w-full h-12 bg-[#363842] text-white rounded-xl hover:bg-[#363842]/90"
              >
                <span className="[font-family:'Equals-SemiBold',Helvetica] font-semibold text-base text-center tracking-[0] leading-4">
                  Delete
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
