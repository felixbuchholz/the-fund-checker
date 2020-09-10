<template>
  <!-- v-container is the basic page container in vuetify -->
  <!-- "fluid" is an attribute that sizes the container to the full page width -->
  <!-- A v-container has a default padding, which we remove, 
  because we’ll use one more nesting of containers-->
  <!-- the pa-0 class stands for "Padding All Zero" -->
  <!-- On spacing classes: https://vuetifyjs.com/en/styles/spacing -->
  <!-- <v-container class="pa-0" fluid> -->
  <v-container class="pa-0" fluid>
    <!-- <v-container class="pa-6 d-flex"> -->
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <!-- https://medium.com/@maeganwilson_/how-to-create-a-navigation-bar-in-vue-js-8a70e7f29f80 -->
    <v-container class="pa-6">
      <v-row class="mt-n1 d-flex align-center justify right">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <transition name="fade-slow">
          <div class="d-flex" style="width: 40%" v-if="fadeIn" id="navigation">
            <a href="#graph_only"
              ><v-btn
                @click.prevent="scrollTo('#graph_only')"
                class="text-none subtitle-2"
                tile
                outlined
                color="primary"
              >
                <v-icon small>mdi-arrow-right-bold</v-icon>&nbsp;Start checking&nbsp;
              </v-btn>
            </a>
            <v-spacer />

            <a href="#introduction_text">
              <v-btn
                class="text-none subtitle-2"
                @click.prevent="scrollTo('#introduction_text')"
                tile
                text
                color="primary"
              >
                Introduction
              </v-btn>
            </a>
            <v-spacer />
            <a href="#about_text">
              <v-btn
                class="text-none subtitle-2"
                @click.prevent="scrollTo('#about_text')"
                tile
                text
                color="primary"
              >
                About
              </v-btn>
            </a>

            
          </div>
        </transition>
        <v-spacer />
        <img
          src="/img/FC_logo.png"
          alt="The Fund Checker Logo"
          style="height: 55px; width:auto;"
        />
      </v-row>
    </v-container>

    <v-carousel
      cycle
      width="100vw"
      height="29.95vw"
      interval="5000"
      hide-delimiter-background
      delimiter-icon="mdi-circle-small"
      show-arrows-on-hover
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      style="background: #004882;"
    >
    <v-carousel-item
      v-for="(image, i) in carousel"
      :key="i"
      eager
      :style="`background: ${image.color}; height:100%;`"
    >
    <v-img
      :src="`/img/${image.path}`"
      :alt="`${image.desc}`"
      :style="`background: ${image.color}; height:100%;`"
    >
      <template v-slot:placeholder>
        <v-row
          align="center"
          justify="center"
          :style="`background: ${image.color}; height:100%;`"
        >
          <!-- <v-progress-circular
            indeterminate
            color="grey lighten-4"
            style="opacity:0.1"
          ></v-progress-circular> -->
        </v-row>
      </template>
    </v-img>
    </v-carousel-item>
    </v-carousel>
    <!-- </v-responsive> -->

    <v-container id="headline" class="pa-6">
      <v-row>
        <!-- TODO: fade in after everything is loaded :) -->
        <transition name="fade-slow">
          <v-col>
            <!-- Vuetify provides typography helper classes: -->
            <!-- https://vuetifyjs.com/en/styles/typography#typography -->
            <!-- <h2 class="overline">How activists use the capitalist toolbox</h2> -->
            <h1 class=" font-weight-bold">
              How index funds voted for you
            </h1>
            <p class="mt-2 title font-weight-normal text--secondary">
              The Fund Checker is a tool to check how individual mutual funds and ETFs voted on shareholder proposals covering environmental, social and governance topics.
            </p>
          </v-col>
        </transition>
      </v-row>


    </v-container>

    <!-- a regular container is not scaled to the full width on larger screens and centered -->
    <transition name="fade-slow">
      <div v-if="fadeIn" id="site">
        <v-container id="introduction_text" class="pa-6">
          <!-- Vuetify’s grid system works with rows (v-row) and columns (v-col) -->
          <!-- https://vuetifyjs.com/en/components/grids#grid-system -->
          <!-- In v-row there are shortcuts to flexbox css attributes available -->
          <!-- align for vertical; justify for horizontal positioning -->

          <v-row class="mt-10" justify="center">
            <!-- With cols="10" we can set a narrower container on the page -->
            <v-col cols="10" lg="8">
              <p class="body-1 text-justify">
                Index funds are at the core of millions of retirement schemes. This share of indexed money in public markets is large: it can flip the outcome of proxy votes at shareholder meetings.
              </p>
              <p class="body-1 text-justify" >  
                Why? Shareholders get to vote, at minimum once a year. Index funds, or in practice, the asset managers behind these funds, vote the funds' shares on behalf of those who own these funds. Besides a companies’ management, shareholders can submit proposals when they like to see a specific change at the company. This means that large asset managers like Vanguard or BlackRock vote on thousands and thousands of proxy items every year, covering the shareholder meetings of thousands of companies in the portfolio of their index funds. Most items that shareholder vote upon are routine matters. But some proposals stick out, calling for strategic changes in how a company is managed. For example, <a href="https://www.wired.com/story/amazon-employees-try-new-activism-shareholders/" target="_blank">shareholders of Amazon</a> have been asking the company to report publicly on how it plans to reduce its reliance on fossil fuels and manage the risks posed by climate change. This specific issue failed, but it sets the agenda.
              </p>

              <p class="body-1 text-justify"> Index funds are passive investors and don’t submit these issues. Yet, large asset managers play an important role behind the scenes, talking to companies, and by the many votes by their funds. </p>

              <p class="body-1 text-justify"> 
              Index funds have to disclose their votes, but the format is everything but easy to read. 
              <span class="font-weight-black"> The Fund Checker </span>is a tool that makes funds’ voting patterns more transparent: <br> <br> <ul> <li>We look at a period of 10 years,</li> <li>and zoom in on proposals brought by shareholders </li> <li>that cover environmental, social and governance topics. </li></ul>
              </p>

                      <v-icon x-small color="primary">mdi-alert-circle</v-icon><span class="caption primary--text">&nbsp;Up-to-date</span>
              <v-card class="pa-6" width="50%" outlined tile style="border-color: #004882;">
                   <div class="primary--text body-2 mt-1">In August 2020 we will update the data with the results of the current voting season.</div>
                
                <!-- <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="mt-2 text-none body-2"
                      color="primary"
                      dark
                      v-on="on"
                      fab
                      x-small
                      depressed
                    ></v-btn>
                  </template>
                  <span>Top tooltip</span>
                </v-tooltip> -->
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <ChartBubbleViolin
          v-if="isHydrated"
          id="graph_only"
          class="my-12"
          v-intersect.quiet="onIntersect"
          :categories="['e', 's', 'g']"
          :categoriesDetails="categoriesDetails"
          yProperty="support"
          :customYDomain="[0, 100]"
          sizeProperty="vote"
          :sizeDomain="[0, 1000]"
          :sizeRange="[1, 15]"
        />

        <v-container v-if="isHydrated" class="pa-6 pa-b-8">
          <v-row justify="center">
            <v-col cols="10" lg="8" >
              <h4
                id="about_text"
                class="display-1 font-weight-black text--secondary"
              >
                About
              </h4>
              <br />
              <p>
                The Fund Checker is a project to shed some light on proxy voting
                patterns of mutual funds and ETFs on ESG issues. The Fund
                Checker is developed by Felix Buchholz and Isabel Verkes, with
                the support of
                <a href="#disclaimer" @click.prevent="scrollTo('#disclaimer')"
                  >Galileo Global Advisors</a
                >.
              </p>
              
              <p>
                <span class="font-weight-black"> FAQ</span> <br />
                <ul> 
                  <li><span class="font-italic" >Environmental, social, governance - explain? </span><br>
                  Our goal is to focus on shareholder proposals that concern ESG issues, as they are socially impactful. Two caveats regarding our method: <ul> <li> The "ESG" classifications are widely used, but not set in stone. The exact scope of each category remains open for debate. </li> <li> This research seeks to focus on prposals that are favorable to seeing companies progressing towards higher ESG standards; leaving out proposals that advocate against stronger ESG standards. However, what amounts to "higher ESG standards" can be subjective.</li></ul>
                  In our analysis, <span class ="font-weight-bold"> environmental </span> proposals relate to a company’s sustainability efforts (e.g. regarding waste, energy use), climate change impact, pollution or natural resource conservation and treatment of animals. Proposals that fall into this category can call for reporting and increased transparency, as well as operational changes by the target company. <br>
                  The <span class="font-weight-bold" > social </span> category in our analysis covers the company’s relationships - for example its lobbying activities, supply chain ethics, consumer privacy, as well as the treatment of employees. Among the shareholder propoosals that make it to the ballot, we see examples of shareholders call upon companies' managements to develop a human rights policy, publish their lobbying activities and assess working conditions for  employees’ health and safety. <br>
                  Less clear is the <span class ="font-weight-bold">good governance </span> category, but in general this covers principles of sound corporate leadership: investors may push for gender diversity in the company's board, adequate (not excessive) executive compensation, transparent accounting methods, better voting rights to improve the accountability of management, and structures to avoid conflicts of interests.
                  </li> <br> 
                  <li><span class="font-italic" >What does the graph show about each fund?</span><br>
                  This graph displays the funds' voting patterns. We counted the number of times funds voted in favor, against and abstained from voting on proposals in an ESG category, over 10 years. The more often a fund voted in favor of a proposal, the higher the fund is positioned on the y-axis. We tracked three different votes: each vote casted as "For" a proposal counts as 1 point, with 0.5 points for votes casted as "Abstain", and 0 points for "Against".
                  </li>
                  <br>
                  <li><span class="font-italic">Are funds that supported more ESG proposals better?</span><br>
                  Not necessarily. First, asset managers also engage with their funds’ portfolio companies outside of shareholder meetings. It is possible that asset managers impose a lot of pressure on companies to improve on ESG issues, while they still vote against ESG-oriented shareholder proposals. However, the proxy vote is the only public record, and thus only way to hold asset managers accountable for their engagement. <br> Second, the quality of a fund depends primarily on its constituents, and thereby it's value to the funds' investors (which can be a mix between financial return, risk-hedging or other purposes). The eventual return encompasses the market value (also versus the net asset value of the portfolio) as well as the costs for the investor (expense ratio).
                  </li>
                  <li> In the search function: the 
                    <v-icon color="#222">mdi-earth</v-icon> icon on the right from a fund name means that the fund is promoted as a sustainable, social, or in general ESG-labeled investment option. In other words, the nature of its portfolio companies are such that it is a branded as a "socially positive" investment.
                  </li>

                </ul>
              </p>


              <p>
                <br>
                <span class="font-weight-black"> Data source</span> <br />
                In this visual, we show data from the annual filings with the
                SEC submitted by funds. Our data spans from 2009 until the most
                recent year 2019 (2020 data will be available in August). They
                are accessible on the <a href ="https://www.sec.gov/edgar/searchedgar/n-px.htm" target="_blank"> SEC's EDGAR database </a> as N-PX filings. These voting records are notoriously
                dense, hard to read. <br><br>
                For the above graph we processed hundreds of N-PX filings. Few methological considerations: <br><br> 
                <ul> 
                  <li>We used the raw N-PX filings for the three largest managers, BlackRock, State Street and Vanguard. While we are open to expand our data tool to include more funds, we decided focus on these three asset managers as their management represents about 93% of the 50 largest funds in the U.S. markets. Taken together, they hold an average stake of more than 20% of companies in the S&amp;P 500. </li> 
                  <li> We aggregated the proposals submitted by shareholders over the period of 2009-2019. This 10-year period ensures that we don't attach too much weight to a select few proposals for one year. Shareholder proposals represent the minority of resolutions that are voted upon by the yearly shareholder meeting. However, they are oftentimes more controversial and outspoken - since the existing management will always disagree with shareholder proposals that make it to the shareholder meeting.</li> 
                  <li>For the shareholder proposals in our data, we selected the ones covering environmental, social and sgovernance (ESG) topics;</li> 
                  <li>and matched the portfolio companies and proposals across the three asset managers. </li>
                </ul>
              </p>
              <br>
              <p></p>
              <br><br>
              <p id="disclaimer">
                <a href="https://galileoglobalgroup.com/gga/" target="_blank">
                  Galileo
                </a>
                is a broker-dealer and investment firm in New York City. It does not market, offer or distribute any fund that is covered by this tool, nor is it sponsored by, or affiliated with, any asset manager covered in this research.
              </p>
                        <img
            v-if="fadeIn"
            src="/img/gga_logo_retina.png"
            alt="Galileo Logo"
            style="height: 25px; width:auto;"
          />
              <br><br>
            </v-col>
          </v-row>

          <v-footer absolute max-height="5" class="font-weight-thin pa-t-6">
            <v-col class="text-center" cols="12">
              {{ new Date().getFullYear() }} — The Fund Checker <sup>©</sup>
            </v-col>
          </v-footer>
        </v-container>


        
      </div>
    </transition>
  </v-container>
</template>

<script>
export default {
  // For components in the pages folder you can use the layout property
  // to select one of the layouts defined in the layouts folder
  layout: "default",
  components: {
    ChartBubbleViolin: () =>
      import(/* webpackPrefetch: true */ "~/components/ChartBubbleViolin.vue")
  },
  data() {
    return {
      isHydrated: false,
      fadeIn: false,
      carousel: [
        {path: "fund-checker-intro-1.jpg", desc: "How does your index fund vote for you?", color: "#004882"},
        {path: "fund-checker-intro-2.jpg", desc: "How does your index fund vote for you?", color: "#81C784"},
        {path: "fund-checker-intro-3.jpg", desc: "How does your index fund vote for you?", color: "#E25F68"},
        {path: "fund-checker-intro-4.jpg", desc: "How does your index fund vote for you?", color: "#579bdc"},
        ],
      categoriesDetails: [
        { code: "e", title: "Environmental", color: "#81C784" },
        { code: "s", title: "Social", color: "#E25F68" },
        { code: "g", title: "Governance", color: "#4A5B7E" }
      ]
    };
  },
  mounted() {
    // console.log("index is mounted");
    this.isHydrated = true;
    setTimeout(() => {
      this.fadeIn = true;
    }, 350);
    // console.log(this.proposals);
  },
  methods: {
    onIntersect(event) {
      // console.log(event);
      if (event[0].isIntersecting) {
        this.$store.commit("interfaceFundSearchBar/ChangeShowInterface", true);
      } else {
        this.$store.commit("interfaceFundSearchBar/ChangeShowInterface", false);
      }
    },
    scrollTo(selector) {
      document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>
