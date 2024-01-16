import React, { useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import Timer from "./Timer";

function ModalSearch({ id, modalOpen, setModalOpen }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-0 justify-center"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto w-full h-full"
        >
          <div
            className="py-4 px-2 w-full h-full"
            id="movetop"
            ref={searchInput}
          >
            <div className="flex justify-end items-center">
              <button
                //onClick={submitHandler}
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(false);
                }}
                type="submit"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
              >
                End Game
              </button>
              {modalOpen ? <Timer /> : null}
            </div>

              <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5 py-24 mx-auto">
                  <div class="mx-auto flex items-center justify-center">
                    <div class="w-full">
                      <h1 class="text-gray-800 text-3xl title-font font-medium mb-1">
                       I spoke to ____ .
                      </h1>
                      <br />
                      <h2 class="text-sm title-font text-gray-500 tracking-widest">
                        Level- Easy
                      </h2>
                      <br />

                      <p class="leading-relaxed">
                        <div className="flex items-center">
                          <input type="radio" name="" id="" className="m-1" />
                          <p className="m-1">
                            1. Fam locavore kickstarter distillery. Mixtape
                            chillwave tumeric sriracha taximy chia microdosing
                            tilde DIY.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" name="" id="" className="m-1" />
                          <p className="m-1">
                            2. Fam locavore kickstarter distillery. Mixtape
                            chillwave tumeric sriracha taximy chia microdosing
                            tilde DIY.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" name="" id="" className="m-1" />
                          <p className="m-1">
                            3. Fam locavore kickstarter distillery. Mixtape
                            chillwave tumeric sriracha taximy chia microdosing
                            tilde DIY.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" name="" id="" className="m-1" />
                          <p className="m-1">
                            4. Fam locavore kickstarter distillery. Mixtape
                            chillwave tumeric sriracha taximy chia microdosing
                            tilde DIY.
                          </p>
                        </div>
                      </p>
                      <div class="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                      <div class="flex justify-end">
                        <button
                          //onClick={submitHandler}
                          onClick={(e) => {
                            e.stopPropagation();
                            //setSearchModalOpen(true);
                          }}
                          type="submit"
                          className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
