import { useRouter, useSearchParams } from "next/navigation";

interface DropdownContainerProps {
  category: string;
  contents: number[] | string[];
  onSelect: () => void;
}

const DropdownContainer = ({
  contents,
  category,
  onSelect,
}: DropdownContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValues = searchParams
    .getAll(category)
    .map((value) => value.toLocaleLowerCase());

  const handleSelect = (value: string | number) => {
    const searchedContent =
      typeof value === "number" ? value.toString() : value.toLowerCase();
    const params = new URLSearchParams(searchParams.toString());
 
    params.delete(category);
    params.append(category, searchedContent);

    router.push(`/search/anime?${params.toString()}`);
    onSelect();
  };

  const handleDelete = (value: string | number) => {
    const searchedContent =
      typeof value === "number" ? value.toString() : value.toLowerCase();
    const params = new URLSearchParams(searchParams.toString());

    const updatedValues = searchParams
      .getAll(category)
      .filter((v) => v.toLowerCase() !== searchedContent);

    params.delete(category);
    updatedValues.forEach((v) => params.append(category, v));

    router.push(`/search/anime?${params.toString()}`);
    onSelect();
  };

  return (
    <section className="overflow-hidden overflow-y-auto max-h-96 bg-white rounded-md mt-2 absolute font-medium w-[182px] sm:w-[132px] md:w-[142px] lg:w-[180px] text-sm z-40 shadow-lg">
      {contents.map((content, index) => {
        const isSelected = selectedValues.includes(
          typeof content === "number"
            ? content.toString()
            : content.toLowerCase()
        );

        return (
          <div
            key={index}
            onClick={() => handleSelect(content)}
            className="flex justify-between items-center px-2 py-2 my-2 mx-1 hover:bg-bgcbody text-txtcard hover:text-blue rounded-sm cursor-pointer"
          >
            <span>{content}</span>
            {isSelected && (
              <button
                className="bg-blue  text-white rounded-full w-5 h-5 font-bold ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(content);
                }}
              >
                <svg
                  className="flex items-center justify-center ml-[5px] mt-1"
                  aria-hidden="true"
                  focusable="false"
                  data-icon="check"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 800 700"
                >
                  <path
                    fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default DropdownContainer;
