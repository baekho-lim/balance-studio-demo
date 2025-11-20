import { NextRequest, NextResponse } from 'next/server'

/**
 * GitHub API를 사용해서 아이콘 파일들을 /public 폴더에 직접 커밋
 *
 * 필요한 환경 변수:
 * - GITHUB_TOKEN: GitHub Personal Access Token (repo 권한)
 * - GITHUB_OWNER: GitHub 사용자명 또는 조직명
 * - GITHUB_REPO: 저장소 이름
 */

interface FileData {
  name: string
  content: string // Base64 encoded
}

export async function POST(request: NextRequest) {
  try {
    // 환경 변수 확인
    const token = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO
    const branch = process.env.GITHUB_BRANCH || 'main'

    if (!token || !owner || !repo) {
      return NextResponse.json(
        {
          error: 'GitHub configuration missing',
          details: 'Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in .env.local'
        },
        { status: 500 }
      )
    }

    // 요청 바디에서 파일 데이터 받기
    const { files }: { files: FileData[] } = await request.json()

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // GitHub API 헤더
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    }

    // 각 파일을 GitHub에 커밋
    const results = []
    for (const file of files) {
      const path = `public/${file.name}`

      // 1. 기존 파일의 SHA 가져오기 (파일이 존재하는 경우)
      let sha: string | undefined
      try {
        const getResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
          { headers }
        )

        if (getResponse.ok) {
          const data = await getResponse.json()
          sha = data.sha
        }
      } catch (error) {
        // 파일이 없으면 새로 생성
        console.log(`File ${path} does not exist, will create new`)
      }

      // 2. 파일 생성/업데이트
      const commitMessage = sha
        ? `Update ${file.name} via Admin Icons Generator`
        : `Add ${file.name} via Admin Icons Generator`

      const body: any = {
        message: commitMessage,
        content: file.content,
        branch,
      }

      if (sha) {
        body.sha = sha
      }

      const putResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify(body),
        }
      )

      if (!putResponse.ok) {
        const error = await putResponse.text()
        console.error(`Failed to commit ${file.name}:`, error)
        throw new Error(`Failed to commit ${file.name}: ${error}`)
      }

      const result = await putResponse.json()
      results.push({ name: file.name, sha: result.content.sha })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully committed ${files.length} files to GitHub`,
      files: results,
      deployUrl: `https://github.com/${owner}/${repo}/commits/${branch}`,
    })

  } catch (error) {
    console.error('Error deploying icons:', error)
    return NextResponse.json(
      {
        error: 'Failed to deploy icons',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
