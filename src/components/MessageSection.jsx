export const MessageSection = () => {
  return (
    <section
      id="mensaje"
      className="section-rule section-wash py-24 px-6"
      aria-labelledby="mensaje-title"
    >
      <div className="mx-auto max-w-5xl">
        <div className="editorial-heading mb-12">
          <span className="inline-flex rounded-full border border-[#b51414]/35 bg-[#b51414]/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#b51414]">
            Una invitación
          </span>
          <h2 id="mensaje-title" className="mt-5 mb-4 text-3xl font-black text-[#820000] md:text-5xl">
            Tenemos un mensaje para ti
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#b51414]">
            Conoce la idea detrás de TrashRar y descubre por qué cada residuo merece llegar a su lugar.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border-2 border-[#b51414]/30 bg-[#fafafa] p-2 shadow-[0_18px_50px_rgba(130,0,0,.12)] brand-reveal">
          <div className="aspect-video overflow-hidden rounded-2xl bg-[#2b0909]">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/kA2YYoq4U_w?si=x_WE4dTMJ-Cumi0es&cc_load_policy=0"
              title="Tenemos un mensaje para ti: video de TrashRar"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
