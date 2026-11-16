"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const ALL_OPTION_VALUE = "all";

export type FilterOption = {
    label: string;
    count?: string;
};

type ChecklistOptionProps = {
    label: string;
    count?: string;
    name: string;
    value?: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ChecklistOption({
    label,
    count,
    name,
    value = label,
    checked,
    onChange,
}: ChecklistOptionProps) {
    return (
        <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-[#D4D4D8]">
            <span className="flex items-center gap-2.5">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="size-4 border-white/20 accent-[#6C55EC]"
                />
                {label}
            </span>

            {count && (
                <span className="text-xs text-[#777982]">{count}</span>
            )}
        </label>
    );
}

type FilterChecklistProps = {
    title: string;
    name: string;
    options: FilterOption[];
};

export function FilterChecklist({
    title,
    name,
    options,
}: FilterChecklistProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Get the selected value from URL
    const selectedValue = searchParams.get(name) || ALL_OPTION_VALUE;
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        const newValue = event.target.value;
        if (newValue === ALL_OPTION_VALUE) {
            params.delete(name);
        } else {
            params.set(name, newValue);
        }
        const query = params.toString();

        router.push(`/browse-jobs?${query}`);
    };

    return (
        <fieldset>
            <p className="mt-5 mb-3 text-sm font-medium text-[#D4D4D8]">
                {title}
            </p>

            <div className="flex flex-col gap-3">
                <ChecklistOption
                    label="All"
                    name={name}
                    value={ALL_OPTION_VALUE}
                    checked={selectedValue === ALL_OPTION_VALUE}
                    onChange={handleOptionChange}
                />

                {options.map(({ label, count }) => (
                    <ChecklistOption
                        key={label}
                        label={label}
                        count={count}
                        name={name}
                        checked={selectedValue === label}
                        onChange={handleOptionChange}
                    />
                ))}
            </div>
        </fieldset>
    );
}