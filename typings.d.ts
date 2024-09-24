import 'umi/typings';
declare global {
  declare namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      style?: CSSProperties & {
        '--primaryColor'?: string;
        '--pageMargin'?: string;
      };
    }
  }
}
