import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import { graphql } from 'gatsby'
import SEO from '../components/SEO'

const CategoryTemplate = props => {
  const {
    pageContext: { category },
    data: {
      categories: { nodes: posts },
    },
  } = props
  return (
    <Layout>
      <SEO title={category} />
      <Hero />
      <Posts posts={posts} title={`category / ${category}`} />
    </Layout>
  )
}

export const query = graphql`
  query GetCategories($category: String) {
    categories: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        frontmatter {
          title
          author
          category
          date(formatString: "MMMM Do, YYYY")
          readTime
          slug
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        id
        excerpt
      }
    }
  }
`

export default CategoryTemplate
