export default function FullPageError({ message }: { message: string }) {
  return (
    <div className="d-flex flex-column text-center justify-content-center vh-100">
      <p className="text-danger fs-3 fw-bold">{message}</p>
      <a href="/">REFRESH PAGE</a>
    </div>
  );
}
