import About from "~/pages/about/index.vue";
import Research from "~/pages/research";
import Students from "~/pages/students";
import Events from "~/pages/events";
import Links from "~/pages/links";
import PublicationsList from "~/components/research/publications.vue";
import ProjectList from "~/components/research/projects.vue";
import Networking from "~/components/events/Networking.vue";
import OverView from "~/components/research/overView.vue";
import MS2 from "~/components/events/ms2.vue";
import Opportunities from "~/components/events/Opportunities.vue";
import Team from "~/components/about/team.vue";
import Introduction from "~/components/about/introduction.vue";
import Head from "~/components/about/head.vue";
import Prospective from "~/components/students/prospective.vue";
import Joining from "~/components/students/joining.vue";
import Current from "~/components/students/current.vue";
import Directions from "~/components/links/directions.vue";
import Location from "~/components/links/location.vue";
import Thanks from "~/components/links/thanks.vue";
import ResearchRelatedLinks from "~/components/links/research.vue";
import Others from "~/components/links/others.vue";
import Resources from "~/components/links/resources.vue";
import TeachingLinks from "~/components/links/teachinglinks.vue";
import Researchers from "~/components/links/researchers.vue";
import Csasm from "~/components/links/research/csasm.vue";
import Csmd from "~/components/links/research/csmd.vue";
import Math from "~/components/links/research/math.vue";
import Mls from "~/components/links/research/mls.vue";
import Kwp from "~/components/links/research/kwp.vue";
import ApplicationAreas from "~/components/research/ApplicationAreas.vue";
var a = [
  {
    name: "Home",
    path: "/",
    id: "home"
  },
  {
    name: "About Us",
    path: "/about",
    id: "about",
    component: About,
    children: [
      {
        name: "Introduction",
        path: "/about/introduction",
        id: "introduction",
        component: Introduction
      },
      {
        name: "Team & Sponsors",
        path: "/about/team",
        id: "team",
        component: Team
      },
      {
        name: "Head Profile",
        path: "/about/head",
        id: "head",
        component: Head
      }
    ]
  },
  {
    name: "Research",
    path: "/research",
    id: "research",
    component: Research,
    children: [
      {
        name: "Overview",
        path: "/research/overview",
        id: "research-overview",
        component: OverView
      },
      {
        name: "Projects",
        path: "/research/projects",
        id: "research-projects",
        component: ProjectList
      },
      {
        name: "ApplicationAreas",
        path: "/research/application",
        id: "links-research",
        component: ApplicationAreas,
        noBar: true
      },
      {
        name: "Publications",
        path: "/research/publications",
        id: "research-publications",
        component: PublicationsList
      }
    ]
  },
  {
    name: "Students",
    path: "/students",
    id: "students",
    component: Students,
    children: [
      {
        name: "Current",
        path: "/students/current",
        id: "students-current",
        component: Current
      },
      {
        name: "Prospective",
        path: "/students/prospective",
        id: "students-prospective",
        component: Prospective
      },
      {
        name: "Joining Us",
        path: "/students/joining",
        id: "students-joining",
        component: Joining
      }
    ]
  },
  {
    name: "News & Events",
    path: "/events",
    id: "events",
    component: Events,
    children: [
      {
        name: "Networking Events",
        path: "/events/networking",
        id: "events-seminar",
        component: Networking
      },
      {
        name: "MS2D & KW Prize",
        path: "/events/ms2",
        id: "events-ms2",
        component: MS2
      },
      {
        name: "Research Opportunities",
        path: "/events/research",
        id: "events-research",
        component: Opportunities
      }
    ]
  },
  {
    name: "Directions & Links",
    path: "/links",
    id: "links",
    component: Links,
    children: [
      {
        name: "Resources",
        path: "/links/resources",
        id: "links-directions",
        component: Resources
      },
      {
        name: "Location",
        path: "/links/location",
        id: "links-location",
        component: Location,
        noBar: true
      },
      {
        name: "Researchers",
        path: "/links/researchers",
        id: "links-researchers",
        component: Researchers,
        noBar: true
      },
      {
        name: "Directions",
        path: "/links/directions",
        id: "links-professional",
        component: Directions
      },
      {
        name: "Research",
        path: "/links/research",
        id: "links-research",
        component: ResearchRelatedLinks,
        noBar: true
      },
      {
        name: "CSASM",
        path: "/links/csasm",
        id: "links-CSASM",
        component: Csasm,
        noBar: true
      },
      {
        name: "Others",
        path: "/links/others",
        id: "links-other",
        component: Others,
        noBar: true
      },
      {
        name: "mmns",
        path: "/links/mmns",
        id: "links-mmns",
        component: Math,
        noBar: true
      },
      {
        name: "Csmd",
        path: "/links/csmd",
        id: "links-csmd",
        component: Csmd,
        noBar: true
      },
      {
        name: "kwp",
        path: "/links/kwp",
        id: "links-kwp",
        component: Kwp,
        noBar: true
      },
      {
        name: "mls",
        path: "/links/mls",
        id: "links-mls",
        component: Mls,
        noBar: true
      },
      {
        name: "mls",
        path: "/links/teaching",
        id: "links-mls",
        component: TeachingLinks,
        noBar: true
      },
      {
        name: "Miscellanea & Thanks",
        path: "/links/misc",
        id: "links-misc",
        component: Thanks
      }
    ]
  }
];
export default a;

export function clean() {
  var clean = [1];
  return clean;
}
