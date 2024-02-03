import{_ as n,o as s,c as a,d as p}from"./app-ChDUwo2y.js";const t="/assets/1706937614871-8CTlDtNN.png",e="/assets/1706937607128-TmD2L9jX.png",c="/assets/1706937964494-23cI35FP.png",o={},l=p(`<h2 id="java-spi的使用" tabindex="-1"><a class="header-anchor" href="#java-spi的使用" aria-hidden="true">#</a> Java SPI的使用</h2><p>Java SPI的使用主要分为以下4个步骤:</p><ol><li>编写接口和实现类</li><li>编写配置文件: 在Resources目录下创建META-INF/services文件夹，在文件夹下创建文本文件，文件的名字就是接口的全限定名, 文件内容则是实现类的全限定名，有多个用换行符隔开</li><li>加载服务: ServiceLoader.load方法</li><li>遍历服务：ServiceLoader实现了 <code>Iterable</code>接口，所以可以通过迭代器进行遍历</li></ol><p>举个🌰</p><h3 id="步骤一-编写接口和实现类" tabindex="-1"><a class="header-anchor" href="#步骤一-编写接口和实现类" aria-hidden="true">#</a> 步骤一：编写接口和实现类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">cc<span class="token punctuation">.</span>hamarr<span class="token punctuation">.</span>javaspi<span class="token punctuation">.</span>protocol<span class="token punctuation">.</span>v2<span class="token punctuation">.</span></span><span class="token class-name">IProtocol</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IProtocol</span> <span class="token punctuation">{</span>

    <span class="token keyword">void</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现类 : HttpProtocol, TcpProtocol</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cc<span class="token punctuation">.</span>hamarr<span class="token punctuation">.</span>javaspi<span class="token punctuation">.</span>protocol<span class="token punctuation">.</span>v2<span class="token punctuation">.</span>http</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cc<span class="token punctuation">.</span>hamarr<span class="token punctuation">.</span>javaspi<span class="token punctuation">.</span>protocol<span class="token punctuation">.</span>v2<span class="token punctuation">.</span></span><span class="token class-name">IProtocol</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HttpProtocol</span> <span class="token keyword">implements</span> <span class="token class-name">IProtocol</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;使用Http发送请求: &quot;</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cc<span class="token punctuation">.</span>hamarr<span class="token punctuation">.</span>javaspi<span class="token punctuation">.</span>protocol<span class="token punctuation">.</span>v2<span class="token punctuation">.</span>tcp</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cc<span class="token punctuation">.</span>hamarr<span class="token punctuation">.</span>javaspi<span class="token punctuation">.</span>protocol<span class="token punctuation">.</span>v2<span class="token punctuation">.</span></span><span class="token class-name">IProtocol</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TcpProtocol</span> <span class="token keyword">implements</span> <span class="token class-name">IProtocol</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;使用Tcp发送请求: &quot;</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤二-编写配置文件" tabindex="-1"><a class="header-anchor" href="#步骤二-编写配置文件" aria-hidden="true">#</a> 步骤二：编写配置文件</h3><p><img src="`+t+'" alt="1706937614871"></p><p><img src="'+e+`" alt="1706937607128"></p><h3 id="步骤三-加载服务" tabindex="-1"><a class="header-anchor" href="#步骤三-加载服务" aria-hidden="true">#</a> 步骤三：加载服务</h3><h3 id="步骤四-使用服务" tabindex="-1"><a class="header-anchor" href="#步骤四-使用服务" aria-hidden="true">#</a> 步骤四：使用服务</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cc<span class="token punctuation">.</span>hamarr<span class="token punctuation">.</span>javaspi<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">cc<span class="token punctuation">.</span>hamarr<span class="token punctuation">.</span>javaspi<span class="token punctuation">.</span>protocol<span class="token punctuation">.</span>v2<span class="token punctuation">.</span></span><span class="token class-name">IProtocol</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Iterator</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ServiceLoader</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SPITest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ServiceLoader</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">IProtocol</span><span class="token punctuation">&gt;</span></span> loader <span class="token operator">=</span> <span class="token class-name">ServiceLoader</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">IProtocol</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">IProtocol</span><span class="token punctuation">&gt;</span></span> iterator <span class="token operator">=</span> loader<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IProtocol</span> service <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            service <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>service <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            service<span class="token punctuation">.</span><span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">&quot;Hello !&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果:</p><p><img src="`+c+'" alt="1706937964494"></p>',17),i=[l];function u(r,k){return s(),a("div",null,i)}const v=n(o,[["render",u],["__file","Java SPIdeshiyong.html.vue"]]);export{v as default};