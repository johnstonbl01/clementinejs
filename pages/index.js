import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <img
            className={styles.logoImage}
            src="/clementine-logo.svg"
            alt="The Clementine.js Logo"
          />
          <h1 className={styles.logoTitle}>Clementine.js</h1>
        </div>

        <p>
          It's been a great ride. I started Clementine.js in 2015 with two goals: to help myself
          learn fullstack JavaScript web development and to provide a resource for others to learn
          as well. It felt like an ambitious project for a first open-source project in the days
          before the popularity of platforms like Medium and Dev.to.
        </p>

        <p>
          To my pleasant surprise, Free Code Camp (a community I was actively engaged in at the
          time) decided to include Clementine.js as part of their curriculum, which meant I had a
          lot of people providing feedback and learning from the project I had created. I can't
          easily express both the overwhelming feeling of happiness and trepidation at this news.
          Despite a heightened sense of anxiety, it was a great experience and I was able to help
          many people learn to code.
        </p>

        <p>
          The learning landscape is incredibly different now, and has been for the past several
          years -- there are so many great resources! I've tried to come up with ideas to preserve
          the spirit of the project with updated resources &amp; writing, but the idea never sticks
          and inevitably falls dormant for months. At this point, I feel like the project is
          actually detrimental to learning modern web development because it teaches outdated
          practices. Knowing that, I feel like the best thing to do is to put the project on hold
          and archive the repositories.
        </p>

        <p>
          Thank you to everyone that has used Clementine.js to learn over the past several years,
          and especially those who reached out to me with your testimonials. I'm absolutely humbled
          and proud to have been part of your journeys. Please don't hesitate to find me on Twitter
          with any questions / concerns in the future.
        </p>
        <div className={styles.signatureLayout}>
          <p>
            - <a href="https://www.blakej.io">Blake</a>
          </p>
        </div>
      </main>
    </div>
  );
}
