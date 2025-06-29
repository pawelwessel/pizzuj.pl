export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 mb-4">
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Use License
              </h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the
                materials on our website for personal, non-commercial transitory
                viewing only.
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>This is the grant of a license, not a transfer of title</li>
                <li>
                  Under this license you may not modify or copy the materials
                </li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to reverse engineer any software contained on our
                  website
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. User Accounts
              </h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. You are
                responsible for safeguarding the password and for maintaining
                the security of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Prohibited Uses
              </h2>
              <p className="text-gray-600 mb-4">You may not use our service:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>
                  For any unlawful purpose or to solicit others to commit crimes
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Disclaimer
              </h2>
              <p className="text-gray-600 mb-4">
                The information on this website is provided on an "as is" basis.
                To the fullest extent permitted by law, this Company excludes
                all representations, warranties, conditions and terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-600 mb-4">
                In no event shall our company or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please
                contact us through our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
