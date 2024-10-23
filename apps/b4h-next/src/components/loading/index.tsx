export const B4hLoading = () => {
  return (
    <>
      <div className="flex justify-center p-5">
        <B4hLoadingLogo />
      </div>
    </>
  );
};

export const B4hLoadingLogo = ({ size }: { size?: number }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="animate-spin"
      src="/logo.svg"
      alt="loading"
      width={size ?? 64}
      height={size ?? 64}
    />
  );
};
