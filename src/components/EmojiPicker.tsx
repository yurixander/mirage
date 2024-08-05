import {useEffect, useState, type FC} from "react"
import useEmojiPicker from "@/hooks/util/useEmojiPicker"
import {twMerge} from "tailwind-merge"
import LoadingEffect from "./LoadingEffect"
import Typography, {TypographyVariant} from "./Typography"

const EmojiPicker: FC = () => {
  const {isError, categories, getEmojisByCategory, isCategoryLoading} =
    useEmojiPicker()

  const [categorySelected, setCategorySelected] = useState<string>()

  useEffect(() => {
    if (categorySelected !== undefined || categories.length === 0) {
      return
    }

    // Select the first category by default.
    setCategorySelected(categories[0].category)
  }, [categories, categorySelected])

  return (
    <div className="flex h-96 w-80 flex-col gap-1 rounded-xl bg-gray-100 p-1.5 shadow-md">
      {isError ? (
        <div className="flex size-full flex-col items-center justify-center">
          <Typography variant={TypographyVariant.Heading}>
            An error ocurred
          </Typography>

          <Typography>Please try again later.</Typography>
        </div>
      ) : (
        <>
          <header className="flex h-10 w-full items-center justify-center gap-1 border-b border-b-slate-300">
            {isCategoryLoading ? (
              <CategoriesPlaceHolder />
            ) : (
              categories.map(category => (
                <button
                  key={category.category}
                  className={twMerge(
                    "flex size-7 cursor-pointer items-center justify-center rounded-md active:scale-95",
                    category.category === categorySelected
                      ? "bg-gray-300"
                      : "hover:bg-gray-200"
                  )}
                  onClick={() => {
                    setCategorySelected(category.category)
                  }}>
                  {category.emojiHeader}
                </button>
              ))
            )}
          </header>

          <div className="size-full overflow-y-scroll scrollbar-hide">
            <div className="size-full">
              {getEmojisByCategory(categorySelected).map(emoji => (
                <div
                  key={emoji.id}
                  className="inline-block rounded-md hover:bg-gray-300">
                  <div className="flex size-11 items-center justify-center text-2xl">
                    {emoji.skins[0].native}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const CategoriesPlaceHolder: FC = () => {
  return Array.from({length: 6}).map((_, index) => (
    <div key={index} className="size-7 overflow-hidden rounded-md bg-gray-300">
      <LoadingEffect />
    </div>
  ))
}

export default EmojiPicker
