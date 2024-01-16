import React from "react";

export default function NoAccess() {
  return (
    <main className="grid h-full place-items-center bg-white m-3">
      <div className="text-center">
        <center>
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/pastel-glyph/64/no-document--v1.png"
            alt="no-document--v1"
          />
        </center>
        <h3 className="mt-4 text-3xl leading-7 text-gray-600">
          You don't have access of this page.
        </h3>
      </div>
    </main>
  );
}
