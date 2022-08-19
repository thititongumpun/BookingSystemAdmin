import { AuthProvider } from "@pankod/refine-core";
import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create();
const AUTH_URL = process.env.REACT_APP_AUTH_URL as string;

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem("auth")!);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token.jwtToken}`;
    } else {
      axios.post(AUTH_URL, { withCredentials: true }).then((res) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
      });
      request.headers = {
        Authorization: `Bearer ${token.jwtToken}`,
      };
    }
  }
  return request;
});

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const request = new Request(AUTH_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
        axiosInstance.defaults.headers.common = {
          Authorization: `Bearer ${auth.jwtToken}`,
        };
      })
      .catch(() => {
        throw new Error("Username or Password is wrong");
      });
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login.required" }),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(""),
  getUserIdentity: () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      const user = {
        name: parsedUser.username,
        avatar:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAB+FBMVEX38Zv4szINMIIAgcX///8ZFxzoTxMENosAneDwigGhDVkAABroUB/lMi338pv/uTT/+aAAAA7nRAD/+ZwAABD5tzMAgMbwjAAAmd8AesMAAAAAAAoaGBwACBsVFBv4+KAPKn8AHIKdAFoAJoIAIYMAMonv6Zf5jwD14I3mSAAAo+UAKoIAI4EAF4IAABUNCBahdinnUxW9uXl/e1SyrXJsaUmdmGXQy4RYVT19XCXkpTG7iCwtJB1jSSKtfiqOaCY3Kx7Fji30nh7wtGoAExzxjyvvgCjzmS3zynz2qSnqYRLxpjepE1XpNCr3y2D024rtdgr0tKKcoo+vs5Lk4ZkqQ4U+W53AwZQGarEJWqTp5ZnO5fJAPjBtakmloWpbWD/YnS9SPCA8Lh5rUCNKRjYyMClVQCGXWA7AcAusZA1jNiGWNxZgOxbJRxTfgQQwHRt1RxPqbC3tkk8sOC8oGBtCKCB3MBlcOhVHLRjxvnLreDrumlXomDu6SE/TeETMaUiwNlTEGkTQLz27JkvqYS70ul/22Zr418z59LB0rLjG16Zbn7yxy6svj8Hqaj3Y5aSYvrDseVT///LujG6UzO8yqdf//tr3yrzxoYh7s95muM1PX4dmc4rC2+6UosVzhbKzvdV+h4xOaKSp1+1BVYaDuN5tgbGIkI1eL+FDAAATCklEQVR4nO2diUNTx77HQ0hYemBySAgBcnJYApGwhYBCWRRBlga0tQgugIpUe+179/aKd6u12lp519debXtv7WutdWtt/TffzNlnzpw5J4Ayh/ptVZSQzCe/3/y2GTQQeK3Xei0ogLTbi3iZAkP9ywFR3MOMYKgxeenA/gzOuKeAxTdzcq4meb4fiMafgaG9ZFSwvyYclsK55KX9os4oDq7uIUaQyUFAKDl5aUhDBIuNjQN7J/6IZ3MKYTicazyQURnBqlw7tiy6fKVfBPqTYU1Sb2+/4p2IOpfs3yuempFlHRG66gDCEs/VSvDj/b5FFKHMbSYeyBmEklRzMQN0uybP+RQRHDg/MLh/KAPUTC+iaKoBwv96Ly2KgaGkpCHu9mK3JJjle2trkr2rZ/cvAwiZqQ1blcsNiRohctTdXu2WJJ5Xwqfcm0yuDi6KMOljiHLv0FBS35f9vkSERtQShJSrbbzYfw43oiSHB/U/kWsXfbkVxVUzfIZzNbgJFa6wpH9WyvgR0RJc6JIk48Pcqh8DKsiYRgpbPqLC1g74cSuKZ3vZXBbCcKMfAyrQ0oE3xJohf/kpWi0AkuzOpit3abfXXISAqKppsNc7YbjGP1sR9A8ODkCdPftmETaUwv5J/GC5sbZXkS0HMiXnlv2yFcVBl0zooNybfjFiAFxiuCdsCnOplGBVKqW0j1Jy0C+IYn9SoiUKSZJkyCa/P9w3OrE2MlJSUjKytjZxaHz4gixLqB/2TcqAjQV1p6WEw8OjIyURqBJDEfT7khSyYm7VJ7MpAGtS0oZSOCWs962VWNksivQJ6EE+SRkQsNZmPkEeXnOgUzWmbMVGX4ymxMFkGN+HsjDWV8LCg0YcFZR2I/km/4Ni8Vwj7p5SKuzGh7QuK+9KrvFshm9XFfsbw4QBxz3wISOqXyb1ykM8I4LlGhlzUWF9xAMfQlzXsqgkN/KcGMVVa6KQZKHPG5+2EzVxjCiew5rC1NiaV8AStBNNRF6nqCCTtG5C4aCXHWgY8ZCgj+dg089peSMOWFtCYbwIPqQx2Xh75DEuT4nBojVReN+CuhH7BNMB+BxOYSYURosEhEpZ3qAaDttFmCm2BxgZtyD2cmhEcbDW8DLhUPGAsJkyE0ZYlvnbibDz1YNh0XtQM+J7OXMnJvfzRgiGjLPsoqOorjXBLIhyB3hzUzPOpA5uERCVbmbCkDK7jURIP22S5PUt8uGlm8Rb1jcjaaqYUo2UeadBquHsMMMYXWwtjOpGNBOGVMtZ/Q23ISKUUu9tA9CaMCTeQo14MadsQnk7fNCIB/X2S5IvcjXQAAHlqEnaSi2DEU4YHYa8ypcNl5UBW+797QGWWDoMma8TN+1AVBjZLiCMNSYhT16KbiZIWy9mLDJiDWc2FNH9GDm8bT5oxAsynzZEJ77bSoUG4SHNiJxFGlSVymPb54MaSanDntxFvggP5HbGhEZKlHLn+SI8n9shExrjb866fEi4xbaXIkGtvPkamiIbbjcXRnQdVMqjmn6eQikk7B12NWGEeoSoUikH3n1940gqYZKvaZt4oHfNBW9kbQKd35vnwHGVbLRv+MJYSr+1gKQmRJmvHl8cOKyZo2REk2ocnW/0ggqRki6Mr6kPXBsdfx+h6Zcxwpg4SxZAHOiLjExAaxwek1PqqscOvz/cN6HYLFLyniArtzHQmDAljI2Pjl+Q4KNylospBCFXoRSIYPHA+phqDX0OAT/IIbMdHj40MjGGWneIDpGU+98pISW7XArjaYghLg+uJnNwxbYbGJJ2hwYZMCWsj/f1vScJsv4ZNmGSm1AKMgPJWsUyjktGnMLBNXVfjq6nwq54iJCbUZs4kHS55YwqMGnCiDmFPwiuXwDVyE2yEM/Z7gfZAIUL5lnpZOW+yymXLwijb8nIANDUxAOl5TvTnITN3xKVlfs+SLkaUV5t6njryJF3mnabD+1Dt9uWeGM8WQkR111v1079Vz6K9A4HVlTniCwTYvVcARImLgvsL4GE/12GFH2LB8JztSyfkyQBr+cSyIh/nGL6qSRN/YkfQjc3zRFHUchNEx/KMvNtkf9cphLy4KXEFQzbYoUJnBC5KQw2bD/VnLQsysU0Cl2jYZjQNiSuVBD/IDDSvjSVVwmzHMTSgHrh0lEC2VXFEyriFUbK0E1YtsEHIQynjt/klLI3xpOVGqIgORQ3U9ouLMte5YIQlh6BSw4Zg3YWVajUED8Q6OFGljUfLYse4WIbdsDSI/MXOiIZZsyNiBA//EigpP6pv/6pTCfkIlkAVHzkr/5tKkyGDol+7UTbiArj5Y+EKWhIpZlSfoSnhCtzZQYhD6EUdETV1fzd5nOSQGzCeNy6ERXEfZevjGmdM9RUKvXHy/tMwk0etqFBWDaxjvucTADGC9PThbjVTVXIyg8/uPKPj/52eP2jf1z54MN9lQmDkI9AYxLOxkfXhZSs/K0C0JqpFD7lj89UQU3HEWolrn1Iys/od4njhpNe44IwoBNOxyORtfHDaGoBf+SG8Rve8emqKh3R6qd2WWzYwcE2hIR6aJ9Ba1cmoIf6Dk2Q94MLVZpm3RBNQi62YSDQ9LG2nnxcg4lQhtvxOZ2wqoB+y0A0CLPXOSG8ntVWVIiTXMQmVLWJQqolZTgScpENocA1I9Q4A05XWZSfmYeQzkbU3T7PQzYMWIPpjKMN56sIbcwz/JSrXIEENsiNaDPhBkkIA44ToZEseHFS60acdyAs2AGrqlwJ87sNZgi8ZWZEx12Y35iZnp5Fmp6e2cijxOiAqAcaXiJpANXeug03HNx0fh6WpIpKlP/j8cIsCrwFGmRCCzRRLtK9qqarOqJjMLXbVXdgMmskKnmLMwEPbspEJQypb0OeTAiNmHdxUxdGqx21bRjlZxciNR2JFu2mmKxm1N4rvr5zHfb5uptuEbFAOCkfXYVFTXrlNrcVN7Uiqk4a5eHMCVfTx1l20lcV1+YYJZ+UkG+FvhfLsmXR/DtcHBxiAh2utSkCnL9xU+mrbrQevTkfwR6qbcW3O65+fJ2TihuX7qd5Bl/k6tHW1k8jkfnPWt94o7X1xs35kkg8EsHGU2j6yp8BFTVdVRFnHYwYiXyCwN5o/exmK/oVMbYevfHpzZufXjW9dJ67/WcR2Mw6xxpov880sDe0X3TKW1Vxk5C3EIoJdOSdYk1k/lOMy+Q7+vmx6nmTcJZnEyqI6OTdZsTIJzdaKXwQ71b1sepqLTYpJSkX56EMgcA1JIKwcJTCp+JBvupN7eHIhJN8mzCAahsYB5veJrbg9C3IaFCij47e/lzFq64+pr8PiJB3Exoio8zMserPb92+fRTp9u1biE7Fg9LncwX+d6Ep8DaJOF2NoHRVmzpmDCAneQ+kVgHSiLCWsWKZqjJrt0kfmZBiROSpFEBrhQcJeWrqXWQ3IppazFThfBtY8Z1IHPcRIc2IyvHo7MzGJtTGxsz0fBxPKolKzrp6N1EIVUpd5GcSc9EjfiKkGpGlwnFO7l14V7GE6MDXV4RFGjF+nKdjCo8qCnCWq4MYbyrOiPkyXi5aehcAxfmo/wgDTf/jmXCWzxGpm5quTxbjoz4kBEc8TofjM2U+JbwWdb65YAWc1CatZb4jfCs658mGc74lfCfq5ThR91Eov/1DHqAj6+WwzfBRHxJm4KKPuxkxbt4l5eV+kGepN/qsGYNCa/FR/xEGmjatM/54YXIykZjEc2S8UOZrQuWqlBJs4pZj7ESB6qO+JPzYONk3zrAVTcYpPupPQv0sirwXlKD4qC8JtXtElCt6KmI873dC7ULfXMJ+WTZh81FfEuqXbPLHKxMk5aTa1+8RQmRHBTJRaXIWCmWkfEcILITIRHNzx1VORZN5EtCHNrxmIcxbSaFsfGX+q0stNxY9au8T+q0/VBrE14RW+W5O83sg7HhN+Hsj9N1U/3dAGNjzhHvfhkUT+uyEdAuE//QTIYiBIgmz2Tuh//UNIoh9/cWXoKiaJpu/Ewr5BBHEYl/+q6HhrlhMb5HdDCkK8N8Fg1jg7r2GutKGb2JYB8xW9KuQpsDXyMH5FYgtf1EH+UoVwuteCaP/1gFD//mi4puvY7HdBqFLc0/EpxDG/vlvb4jRb0Om7tfX13/3zXKMP0tC51LcU1PDF/8Hl/v9pgfG6A8hjLCioqK+/se7mRhX358HYovflJp8kPCBuuB3s26M0XdDNkIEWfHjl9xsScw9CcJQ6Idslgn4fYhKiAzZiSB3mw5Ki564TMJQ6NuoM2P2Dg4Y+sUgVCHv7jYijJ64e2qqu2dZ9R0nxmwZCYgTIsgvdxURFS8NFD6CEDJ+RduOep5nEVZUnAjs3nYEX99raKDgIcJ6YuXf522M2a/sgBTCuuBCYJfsCGL/cuCDhKW2tb9LuKolzzMJOxt62l7sEiNwBISirB7bjlieN3XfRljReaa5refFq/dVAGJ3GYQNtOVbtiOe55mEFRXBYLA7vQBe6V9hDsTY4gtqjGERmq5K5Hk2YWdpOhhsbls6Ib4yRiCCUw9buhg+6kQYurMZzWazZJ53sSH0U2jGrpbnp1Bn/QoAY4ETSy1dzWeYhCtODO/+8O1XtjRo6EcqYT0ihIw9Py2+gu0ogoWlFviKzaw4wyBki0pY0XlaRQx2d7/07QhipxS+YHCJBbjDhBWd5UFNLUunXmrmiC0+7OlSXqn5NAuwbquE3zkQ1jXriNBVMy/NjEBcaEnrr8QIpMiGj+gEK4+fPHnKoP+OCmg1InTVrhMvZzfCJvB5i/4q7DjjRLhysifdle7uKX/sBNnpQFhhGhG+eM/D5ZfgqiC20NJlvgjTSSHhL5TlP25pL1eVbjv5lAb4H0dCqxGDwXT3iR1HFDM/tVheopwNWNpw3778k93lptrbyh9TCJ0AYXnabEVs3vHdGFtcSltfwMVJSxt+tXloeVc5rnSXndGRsKICI4RmbN/JoApiJ9q6sLfwNDvQ2AlX0u3lNtkZnQHVwgYz47MdK3CA+KInSDx9+Rlmxq97QAB2UQARYxoLSSv0ZKEQlhKEwWDb0uLOmBGAZyQgYmRCkoTtdEC4H0MeCZUWg1BX2w4FnIct9id3gSQIl5wAu55gj3vEIOw8Q1lCz8L2EUHgeTcdUIUMUiHxQc3PZJAx1I0nRnuLbyE8bXNThPhsu4gggwVRKmXwjC07YoRPe5wA23/DnflRaYVTRuw83UV99Z4X20P0AIgY0/bsYV34SScnbSFKn19gV+1ASIZSE3FbjuoNkJIe8VHUSjcdsP1kiCQsraMxdlaUOwFCxG0kRrgHPQFSSji8yX/aRiVsI0u3+w3Ku0MydtYzAGEpvrjlvAgeMoKMwRekhRpijEGPNUsEYOhX5anqCMbO+iALMJh+vsVzKiD+1OYBsJxa3pCDGtpOTNuqtgeW5zIB7bmeUMsWo03smUMexAAdKlSyBabF024S0Epo2NEdECJu6V/aiy1QKhmvgPYxxpM0CUhke6R7Vn9AMacTtvf0LIGp6/kWGo3YKS+Ajm2ivQW21TU99ja4FPd4ZMcGD4AwnhZfvomLHgBhjHHqMeyEK0Q8bf/ZBkgSIsgzzDBqqtg+A2TY4QvJIcY4EYYe44hktkeiVrmnvTC2FZn3QeyhayJsXnI0YCl9jIGljHZbqnAiLC094+HtDhZnwtgL1zDq0ubTxhghLJBSBjUrTu1YnTtjS1FGFN2jjOsoyjbGCBGlDeXzjoQeGJuDRYwYwXKzq1cwO/xSewus6onhp2RXoegR61ndGFtOec4YQHTfhC4DYSdCSzxNUz79C/t9YzN2PfTspl5SvZuTkncVND1OM/fhr66eQevzdfV4LcDBkIdizeVgxonQGkvJzgnqgRshCquOalvw5qYALHmpIppd3JRKiEUaSklzz833S6mTDH1JS97cNPbMQ0PhPhOm3MYgen3KPLjejbCBuaYeT/W3eMqLjwZd5/o0QrJusz3ANXwtMaNpt5cmCgQ8+WjQ7QyYepL/G94G2zp8p5LGkOOsRluSlw4j9sKTjwY9nK/ZCYk+35YSGQlffUq3LO0hmgJPHYUqFze1nwI/JjvEtiIJy92W1HbC1Yix5x59NOjqpnbCcrJBJKcYzJLG1Ueh0j+5bcTYCe8mdC29yebIPm8jU+J9JiErUehLWnLrEjPd3rpNTcUR/mwfRrXgdn7AiqV1XlbkthFjzzwMDy3vGLNyIxvElRYbIDmpYRDWuW9CJJezqGLCjKIzzBaYaJ+eUCem2ENYCd99EyKlnzFbKPGh9zCjimlDgpA69cZTIuuuo7ftw565eRquYWK6aQPePj2lHl3g0ygGoScfRUvKsJzUazVjihVNG/DS2+GM1Hp+yEiH3nw0yC5NYwseC1KLWA0G3lw8osQZJGtKdE6HHhKFJlaoyRTNx3ZTvPT+zeEE0Tpxc+x/PSUKVYziO7bgtSC1itkHWwkdTAhjjZk2HftfjzNhJOeqBix7OSi0iVG51dVZAG0lqaEus/x26n89b0K0oOcY4f8Dik3J7r9S9OIAAAAASUVORK5CYII=",
      };
      return Promise.resolve(user);
    }
    return Promise.reject();
  },
};
