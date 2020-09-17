/* config-overrides.js */
const path = require('path')
const rewirePostcss = require('react-app-rewire-postcss')
const px2rem = require('postcss-px2rem')
const { override, addWebpackAlias, useEslintRc } = require('customize-cra')

module.exports = override(
	//路径别名
	addWebpackAlias({
		'@': path.resolve(__dirname, 'src'),
	}),
	// 不需要将eslint的报错抛到浏览器上，在控制台即可
	useEslintRc('./.eslintrc.js'),
	(config, env) => {
		// 重写postcss
		rewirePostcss(config, {
			plugins: () => [
				require('postcss-flexbugs-fixes'),
				require('postcss-preset-env')({
					autoprefixer: {
						flexbox: 'no-2009',
					},
					stage: 3,
				}),
				//关键:设置px2rem
				px2rem({
					remUnit: 180,
					exclude: /node-modules/,
				}),
			],
		})
		return config
	}
)
