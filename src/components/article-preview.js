import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    {article.cloudinaryimage && (article.cloudinaryimage[0].resource_type === "video"
      ? <video src={article.cloudinaryimage[0].secure_url}/>
      : <img src={article.cloudinaryimage[0].secure_url} />)}
    {article.heroImage && (<Img alt="" fluid={article.heroImage.fluid} />)}
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
