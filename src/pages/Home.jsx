import HeroSection from "../components/HeroSection";

export default function Home({ onGetStarted }) {
  return (
    <div>
      <HeroSection />

      <div className="motto flex min-h-dvh flex-col items-center justify-start space-y-4 bg-gradient-to-b from-black via-black to-white px-6 pt-24 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-teal-500">
          YOUR MONEY. YOUR CONTROL.
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-x8 md:text-6xl">
          Take control. Spend with purpose.
        </h1>

        <p className="max-w-2xl text-lg leading-6 text-white/60 sm:text-1xl">
          Track your income, manage your expenses, and stay on budget.
          Make smarter financial decisions with a clearer view of your money.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="#get-started"
            onClick={(e) => {
              e.preventDefault();
              onGetStarted();
            }}
            className="rounded-full bg-teal-500 px-6 py-1.5 text-[13px] font-medium text-white transition hover:bg-teal-400"
          >
            Get Started
          </a>
          <a
            href="#get-started"
            className="rounded-full border border-white/20 bg-transparent px-6 py-1.5 text-[13px] font-medium text-white transition hover:bg-white/10"
          >
            Learn More
          </a>
        </div>
      </div>

      <section>
        <div className="min-h-dvh bg-white"></div>
      </section>
    </div>
  );
}