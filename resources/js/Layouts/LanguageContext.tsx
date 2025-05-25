import { ConfigProvider } from "antd"
import React from "react"
import { useTranslation } from "react-i18next"

const LanguageContext: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { i18n } = useTranslation()
    const [lang, setLang] = React.useState(i18n.language)

    React.useEffect(() => {
        setLang(i18n.language)
    }, [i18n.language])

    const fontFamily = lang === 'ar'
        ? '"Cairo", "Readex Pro", "Noto Sans", sans-serif'
        : 'Poppins, Roboto, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily
                }
            }}
        >
            <div className={lang === 'ar' ? 'font-arabic' : 'font-english'}>
                {children}
            </div>
        </ConfigProvider>
    )
}

export default LanguageContext;