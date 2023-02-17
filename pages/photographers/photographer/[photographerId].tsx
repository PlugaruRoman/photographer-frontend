import Head from "next/head";

const Photographer: React.FC = () => {
  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>
      <div
        style={{
          padding: "30px 0px 30px 0px",
          background: "#1B2026",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>User Page</div>
      </div>
    </>
  );
};

export default Photographer;
