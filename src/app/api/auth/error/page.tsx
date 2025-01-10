// pages/auth/error.tsx
export default function AuthErrorPage({ query }: { query: any }) {
    const error = query.error;

    return (
        <div>
            <h1>Authentication Error</h1>
            <p>{error === "OAuthAccountNotLinked"
                ? "An account with the same email already exists. Please use the linked login method."
                : "Something went wrong. Please try again."
            }</p>
        </div>
    );
}
