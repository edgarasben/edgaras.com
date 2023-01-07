export const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="container max-w-screen-sm space-y-8 pt-4 pb-24 xs:space-y-16 xs:pt-24 lg:max-w-screen-md">
        {children}
    </div>
)
