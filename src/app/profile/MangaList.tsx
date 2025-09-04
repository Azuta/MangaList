"use client";

const MangaListProfile = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h2-heading mb-4">
          <i className="fas fa-heart mr-3"></i>Watch List
        </h2>
        <div
          data-option="public_watch_list"
          className="dub-toggle quick-settings-toggle  mt-0"
        >
          <span className="dt-dub">Public</span>
          <span className="dt-status"></span>
        </div>
      </div>

      <style jsx>{``}</style>
    </>
  );
};

export default MangaListProfile;
